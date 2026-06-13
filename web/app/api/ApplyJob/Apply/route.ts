import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth';

interface ApplicationData {
  jobId: string;
  applicantId: string;
  coverLetter: string;
  resumeUrl: string;
  status: string;
  fullName: string;
  email: string;
  phone: string;
  currentRole: string;
  yearsOfExperience: string;
  education: string;
  noticePeriod: string;
  expectedSalary: number | null;
  salaryCurrency: string;
  portfolio: string;
  referralSource: string;
  workAuth: string;
  willingToRelocate: boolean;
  consentGiven: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // FIX 1: Properly type the formData
    const formData = await request.formData() as FormData;
    
    // FIX 2: Use session.email, not user.email 
    const user = await prisma.user.findUnique({
      where: { email: session.user.email } 
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Handle upload files - with proper null check
    const resumeFile = formData.get('resume');
    let resumeUrl = '';

    if (resumeFile && resumeFile instanceof File) {
      resumeUrl = `/uploads/resumes/${Date.now()}_${resumeFile.name}`;
    }

    // Extract form fields - with proper null checks and correct field names
    const applicationData: ApplicationData = {
      jobId: formData.get('jobId')?.toString() || '',
      applicantId: user.id, 
      coverLetter: formData.get('coverLetter')?.toString() || '',
      resumeUrl: resumeUrl, 
      status: 'PENDING',
      fullName: formData.get('fullName')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      currentRole: formData.get('currentRole')?.toString() || '',
      yearsOfExperience: formData.get('experience')?.toString() || '',
      education: formData.get('education')?.toString() || '',
      noticePeriod: formData.get('noticePeriod')?.toString() || '',
      expectedSalary: formData.get('expectedSalary') ? parseFloat(formData.get('expectedSalary')?.toString() || '0') : null,
      salaryCurrency: 'KES',
      portfolio: formData.get('portfolio')?.toString() || '',
      referralSource: formData.get('referral')?.toString() || '',
      workAuth: formData.get('workAuth')?.toString() || '',
      willingToRelocate: formData.get('relocate') === 'on',
      consentGiven: formData.get('consent') === 'on',
    };

    // Validate required fields
    if (!applicationData.jobId) {
      return NextResponse.json(
        { success: false, error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Create job application 
    const application = await prisma.jobApplication.create({
      data: applicationData,
      include: { 
        job: true
      }
    });

    // Update job application count
    await prisma.jobListing.update({
      where: { id: applicationData.jobId },
      data: {
        applications: {
          increment: 1
        }
      }
    });

    // Create notification for job poster
    const job = await prisma.jobListing.findUnique({
      where: { id: applicationData.jobId },
      include: { postedBy: true }
    });

    if (job) {
      await prisma.notification.create({
        data: {
          type: 'JOB_APPLICATION',
          title: 'New Job Application',
          message: `${applicationData.fullName} applied for ${job.title}`,
          userId: job.postedById,
          data: {
            applicationId: application.id,
            jobId: job.id
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: application
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}