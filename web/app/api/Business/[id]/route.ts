import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  try {
    // Await the params object
    const { id } = await params;
    
    console.log(` Fetching business with ID: ${id}`);
    
    const business = await prisma.business.findUnique({
      where: { id: id },
      include: {
        owner: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!business) {
      return NextResponse.json({
        success: false,
        error: 'Business not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: business
    });
    
  } catch (error: any) {
    console.error('Error fetching business:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch business',
      message: error.message
    }, { status: 500 });
  }
}