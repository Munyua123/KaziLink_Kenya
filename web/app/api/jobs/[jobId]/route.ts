import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";

// Fix the params type - use Promise-based params for Next.js 15+
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    // Await the params
    const { jobId } = await params
    
    const job = await prisma.jobListing.findUnique({
      where: { id: jobId },
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
            logo: true,
            location: true,
            description: true,
            contactEmail: true,
            contactPhone: true
          }
        }
      }
    })

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.jobListing.update({
      where: { id: jobId },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json({
      success: true,
      data: job
    })
    
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job' },
      { status: 500 }
    )
  }
}