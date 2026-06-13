// app/api/business/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    console.log(' Fetching REAL business data from database...')
    
    // Get URL parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const isFeatured = searchParams.get('isFeatured')
    const limit = parseInt(searchParams.get('limit') || '100')
    
    // Build WHERE clause
    const where: any = {}
    
    if (category) {
      where.category = category
    }
    
    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      }
    }
    
    if (isFeatured === 'true') {
      where.isFeatured = true
    }
    
    if (isFeatured === 'false') {
      where.isFeatured = false
    }
    
    // Add status filter
    where.status = 'ACTIVE'
    
    console.log('Query conditions:', where)
    
    // Fetch real data
    const businesses = await prisma.business.findMany({
      where,
      take: Math.min(limit, 200),
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        location: true,
        logo: true,
        contactPhone: true,
        contactEmail: true,
        website: true,
        rating: true,
        reviewCount: true,
        isVerified: true,
        isFeatured: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        owner: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
    
    console.log(` Found ${businesses.length} REAL businesses in database`)
    
    return NextResponse.json({
      success: true,
      data: businesses,
      count: businesses.length,
      isMock: false,
      message: 'Real business data fetched successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error(' ERROR fetching businesses:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    })
    
    // Return empty array instead of mock data
    return NextResponse.json({
      success: false,
      error: 'Database query failed',
      message: error.message,
      data: [], // Empty array, not mock data
      count: 0,
      isMock: false
    }, { status: 500 })
  }
}