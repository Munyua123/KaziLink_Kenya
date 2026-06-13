import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  try {
    // Await the params object
    const { id } = await params;
    
    console.log(` Fetching services for business: ${id}`);
    
    const services = await prisma.service.findMany({
      where: { businessId: id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: services,
      count: services.length
    });
    
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json({
      success: true,
      data: [],
      count: 0,
      message: 'No services found or error occurred'
    });
  }
}