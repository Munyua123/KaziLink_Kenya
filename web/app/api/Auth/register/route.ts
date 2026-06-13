import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
   
    
    try {
        // Log the raw request
        const body = await request.json();
        console.log(" Request body received:", JSON.stringify(body, null, 2));

        // Destructure with validation
        const {
            // Common fields
            fullName,
            email,
            phone,
            password,
            accountType,

            // Job seeker fields
            skills,
            experience,
            education,
            expectedSalary,
            jobType,
            location,

            // Employer fields
            companyName,
            companySize,
            industry,
            companyWebsite,
            companyDescription,
            companyLocation,
            contactPosition
        } = body;

        // Validate required fields
        const missingFields = [];
        if (!fullName) missingFields.push('fullName');
        if (!email) missingFields.push('email');
        if (!phone) missingFields.push('phone');
        if (!password) missingFields.push('password');
        if (!accountType) missingFields.push('accountType');

        console.log(" Validation check:", {
            hasFullName: !!fullName,
            hasEmail: !!email,
            hasPhone: !!phone,
            hasPassword: !!password,
            hasAccountType: !!accountType,
            accountTypeValue: accountType,
            missingFields
        });

        if (missingFields.length > 0) {
            console.log(" Missing required fields:", missingFields);
            return NextResponse.json(
                { 
                    success: false, 
                    error: `Missing required fields: ${missingFields.join(', ')}` 
                },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log(" Invalid email format:", email);
            return NextResponse.json(
                { success: false, error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Check if user exists
        console.log(" Checking for existing user with email:", email);
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log(" User already exists:", email);
            return NextResponse.json(
                { success: false, error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        console.log(" Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        // Determine role
        const role = accountType === 'employer' ? 'EMPLOYER' : 'JOB_SEEKER';
        console.log(" Account type:", accountType, "-> Role:", role);

        // Prepare data based on account type
        let userData: any = {
            name: fullName,
            email,
            phone,
            password: hashedPassword,
            role,
        };

        // Add job seeker fields if applicable
        if (accountType === 'jobseeker') {
           
            userData = {
                ...userData,
                skills: skills || [],
                experience: experience || null,
                education: education || null,
                expectedSalary: expectedSalary || null,
                preferredLocation: location || null,
            };
        }

        // Add employer fields if applicable
        if (accountType === 'employer') {
           
            userData = {
                ...userData,
                companyName: companyName || null,
                companySize: companySize || null,
                industry: industry || null,
                companyWebsite: companyWebsite || null,
                companyLocation: companyLocation || null,
                companyDescription: companyDescription || null,
                contactPosition: contactPosition || null
            };
        }

       

        // Create user
        const user = await prisma.user.create({
            data: userData
        });

        console.log(" User created successfully with ID:", user.id);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword
        });

    } catch (error: any) {
        console.error(' Registration error:', {
            message: error.message,
            code: error.code,
            meta: error.meta,
            stack: error.stack
        });

        // Handle Prisma-specific errors
        if (error.code === 'P2002') {
            return NextResponse.json(
                { success: false, error: 'A user with this email already exists' },
                { status: 400 }
            );
        }

        // Return error as JSON
        return NextResponse.json(
            { 
                success: false, 
                error: error.message || 'Failed to create account'
            },
            { status: 500 }
        );
    }
}