
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
   // console.log(' Attempting to fetch jobs from database...')
    
    // Try to import prisma dynamically
    let prisma
    try {
      const module = await import('@/lib/prisma')
      prisma = module.default
      console.log(' Prisma client loaded successfully')
    } catch (prismaError: any) {
      console.error(' Failed to load Prisma client:', prismaError.message)
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        message: 'Prisma client initialization error',
        data: [],
        count: 0,
        isMock: false
      }, { status: 500 })
    }
    
    // Get URL parameters
    const { searchParams } = new URL(request.url)
    const jobType = searchParams.get('jobType')
    const location = searchParams.get('location')
    const isRemote = searchParams.get('isRemote')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    // Build WHERE clause
    const where: any = {
      status: 'ACTIVE'
    }
    
    if (jobType) {
      where.jobType = jobType
    }
    
    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      }
    }
    
    if (isRemote === 'true') {
      where.isRemote = true
    } else if (isRemote === 'false') {
      where.isRemote = false
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    console.log('Query conditions:', JSON.stringify(where, null, 2))
    
    // Try to fetch data
    const jobs = await prisma.jobListing.findMany({
      where,
      take: Math.min(limit, 100),
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        company: true,
        location: true,
        jobType: true,
        salaryMin: true,
        salaryMax: true,
        salaryUnit: true,
        salaryCurrency: true,
        experienceLevel: true,
        educationLevel: true,
        requirements: true,
        benefits: true,
        isRemote: true,
        isFeatured: true,
        status: true,
        applicationDeadline: true,
        views: true,
        applications: true,
        createdAt: true,
        updatedAt: true,
        business: {
          select: {
            id: true,
            name: true,
            logo: true
          }
        }
      }
    })
    
    console.log(` Successfully fetched ${jobs.length} jobs from database`)
    
    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs.length,
      isMock: false,
      message: 'Real job data fetched successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error(' ERROR in jobs API:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    })
    
    return NextResponse.json({
      success: false,
      error: 'Database query failed',
      message: error.message,
      data: [],
      count: 0,
      isMock: false,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}