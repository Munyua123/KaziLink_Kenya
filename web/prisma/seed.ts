// prisma/seed-enhanced.ts

import { ApplicationStatus, BusinessStatus, EducationLevel, ExperienceLevel, JobStatus, JobType, PrismaClient, SavedItemType } from "@/app/generated/prisma"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// Unsplash image URLs for gallery images
const BUSINESS_GALLERY_IMAGES = {
  // Wedding/Photography Business Images (25+ images)
  photography: [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMHBob3RvfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=800&fit=crop',
   'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMHBob3RvfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1607357910286-1ff94ac13c24?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1627580356665-cb0b792a0fb7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1620525429871-81919b5bd668?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1756395959307-d546b7947e3d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1594551801881-297d7bd749d9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8',
    'https://plus.unsplash.com/premium_photo-1661443575453-22d2cc475ff0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D',
    'https://plus.unsplash.com/premium_photo-1678834778658-9862d9987dd3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI5fHx8ZW58MHx8fHx8',
    'https://plus.unsplash.com/premium_photo-1661266867203-2a71342fa6b6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8',
    'https://plus.unsplash.com/premium_photo-1733306436936-894541074f7c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1572085313466-6710de8d7ba3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2FyZGVufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1608340097690-31a9135be968?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VlZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
  ],
  
  // Technology Business Images (20+ images)
  technology: [
    'https://images.unsplash.com/photo-1721333091782-1f4140831683?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=800&fit=crop',
    'https://plus.unsplash.com/premium_photo-1726862557521-000a02f0a156?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcHV0ZXIlMjByZXBhaXJlfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1764692556161-9df60b922dd0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    'https://plus.unsplash.com/premium_photo-1661645210231-e636cb2b9291?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1551717256-980e8d03413a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1563884705074-7c8b15f16295?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHJvdXRlciUyMGNvbm5lY3Rpb258ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1596480330945-12a5380b9c59?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1576446468729-7674e99608f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lyaW5nfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1588616437819-7d30e6f76e66?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=800&fit=crop',
    'https://plus.unsplash.com/premium_photo-1682086494778-a03e240fd089?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8',
    'https://plus.unsplash.com/premium_photo-1661657603741-eb321e840777?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1746123725998-c0f6dcdda373?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=800&fit=crop',
    'https://plus.unsplash.com/premium_photo-1661938291778-2a82f3ef79ae?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D',
  ],
  
  // Salon Business Images (20+ images)
  salonist: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1722351153083-e32ff83a0c8a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHNhbG9ufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1629397685944-7073f5589754?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2Fsb258ZW58MHx8MHx8fDA%3D',
    'https://plus.unsplash.com/premium_photo-1661292395428-2b13130aa106?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1676677522900-de4d73150cfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1634942536821-56d8a5b7f5c9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhaXJ8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hc3NhZ2V8ZW58MHx8MHx8fDA%3D',
    'https://plus.unsplash.com/premium_photo-1661577067000-3f2e7a09a0ca?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Fsb24lMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1612810806695-30f7a8258391?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpbmNhcmV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1607779097387-f7ce5e8835b7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFpbCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1562322161-9db6e2ad20c6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Fsb24lMjBlcXVpcG1lbnR8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R5bGluZyUyMHRvb2xzfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1723924998603-7a4c216911d8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
  ],
}

async function main() {
  console.log(' Starting enhanced database seeding...')
  
  const plainPassword = '@jhoelloh9045'
  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  // Clear existing data
  console.log(' Clearing existing data...')
  await prisma.$transaction([
    prisma.savedItem.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.message.deleteMany(),
    prisma.conversation.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.booking.deleteMany(),
    prisma.review.deleteMany(),
    prisma.jobApplication.deleteMany(),
    prisma.jobCategory.deleteMany(),
    prisma.jobListing.deleteMany(),
    prisma.galleryImage.deleteMany(),
    prisma.service.deleteMany(),
    prisma.business.deleteMany(),
    prisma.user.deleteMany(),
  ])

  console.log(' Creating 20+ users...')
  const users = []
  
  // Create admin users
  for (let i = 1; i <= 3; i++) {
    users.push(await prisma.user.create({
      data: {
        email: `admin${i}@kazilink.co.ke`,
        name: `Admin ${i}`,
        phone: `+254 700 000 00${i}`,
        profileImage: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&random=${i}`,
        role: 'ADMIN',
        password: hashedPassword,
        emailVerified: new Date(),
      },
    }))
  }

  // Create business owners
  const businessOwners = [
    { name: 'Joe Studio', email: 'joe@joestudio.co.ke', phone: '+254 743861565' },
    { name: 'TechFix Team', email: 'tech@techfix.co.ke', phone: '+254 723 456 789' },
    { name: 'Sarah Beauty', email: 'sarah@blissfulbeauty.co.ke', phone: '+254 734 567 890' },
    { name: 'Swift Delivery', email: 'delivery@swift.co.ke', phone: '+254 745 678 901' },
    { name: 'Creative Designs', email: 'hello@creative.co.ke', phone: '+254 756 789 012' },
    { name: 'Food Express', email: 'orders@foodexpress.co.ke', phone: '+254 767 890 123' },
  ]

  for (const owner of businessOwners) {
    users.push(await prisma.user.create({
      data: {
        email: owner.email,
        name: owner.name,
        phone: owner.phone,
        profileImage: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&random=${Math.random()}`,
        role: 'BUSINESS_OWNER',
        password: hashedPassword,
        emailVerified: new Date(),
      },
    }))
  }

  // Create job seekers
  for (let i = 1; i <= 10; i++) {
    users.push(await prisma.user.create({
      data: {
        email: `jobseeker${i}@example.com`,
        name: `Job Seeker ${i}`,
        phone: `+254 777 777 77${i.toString().padStart(2, '0')}`,
        profileImage: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&random=${i}`,
        role: 'JOB_SEEKER',
        password: hashedPassword,
        emailVerified: new Date(),
      },
    }))
  }

  console.log('Creating 15+ businesses...')
  const businesses = []

  // Featured businesses with many images
  const featuredBusinesses = [
    {
      name: 'Joestudio & Photography',
      description: 'Professional photography services for all occasions. With over 10 years of experience, we specialize in capturing your most precious moments with creativity and professionalism. We offer wedding, portrait, commercial, and event photography.',
      category: 'Photography',
      location: 'Nairobi, CBD',
      coverImage: 'https://images.unsplash.com/photo-1556103255-4443dbae8e5a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8',
      logo: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
      contactPhone: '+254 743861565',
      contactEmail: 'hello@joestudio.co.ke',
      website: 'www.joestudio.co.ke',
      rating: 4.9,
      reviewCount: 247,
      isVerified: true,
      isFeatured: true,
      status: BusinessStatus.ACTIVE,
      ownerId: users[3].id,
      galleryImages: BUSINESS_GALLERY_IMAGES.photography,
    },
    {
      name: 'TechFix Solutions Kenya',
      description: 'Comprehensive IT support and technology solutions provider. We offer computer repair, network setup, software development, cybersecurity, and IT consulting services for businesses and individuals across Kenya.',
      category: 'Technology',
      location: 'Nairobi, Westlands',
      logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
      coverImage: 'https://plus.unsplash.com/premium_photo-1661644887413-169caed7ca7b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm91dGVyc3xlbnwwfHwwfHx8MA%3D%3D',
      contactPhone: '+254 723 456 789',
      contactEmail: 'support@techfix.co.ke',
      website: 'www.techfix.co.ke',
      rating: 4.7,
      reviewCount: 189,
      isVerified: true,
      isFeatured: true,
      status: BusinessStatus.ACTIVE,
      ownerId: users[4].id,
      galleryImages: BUSINESS_GALLERY_IMAGES.technology,
    },
    {
      name: 'Blissful Beauty Salon & Spa',
      description: 'Premium beauty salon and spa offering hair styling, nail care, facial treatments, and full-service beauty solutions. Our expert team provides personalized services in a luxurious and relaxing environment for clients seeking professional beauty care.',
      category: 'Beauty & Salon',
      location: 'Nakuru',
      logo: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=400&fit=crop',
      contactPhone: '+254 734 567 890',
      contactEmail: 'info@blissfulbeauty.co.ke',
      website: 'www.blissfulbeauty.co.ke',
      rating: 4.8,
      reviewCount: 312,
      isVerified: true,
      isFeatured: true,
      status: BusinessStatus.ACTIVE,
      ownerId: users[5].id,
      galleryImages: BUSINESS_GALLERY_IMAGES.salonist,
    },
  ]

  // More businesses (not all featured)
  const additionalBusinesses = [
    {
      name: 'Creative Design Studio',
      description: 'Full-service creative agency offering branding, graphic design, web development, and marketing solutions for businesses of all sizes.',
      category: 'Creative',
      location: 'Mombasa',
      logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=400&fit=crop',
      contactPhone: '+254 756 789 012',
      contactEmail: 'hello@creativedesign.co.ke',
      website: 'www.creativedesign.co.ke',
      rating: 4.5,
      reviewCount: 134,
      isVerified: true,
      isFeatured: false,
      status: BusinessStatus.ACTIVE,
      ownerId: users[6].id,
    },
    {
      name: 'FoodExpress Catering',
      description: 'Professional catering services for events, corporate functions, weddings, and private parties. We offer a variety of cuisines and custom menu options.',
      category: 'Food & Catering',
      location: 'Kisumu',
      logo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop',
      contactPhone: '+254 767 890 123',
      contactEmail: 'orders@foodexpress.co.ke',
      website: 'www.foodexpress.co.ke',
      rating: 4.7,
      reviewCount: 289,
      isVerified: true,
      isFeatured: true,
      status: BusinessStatus.ACTIVE,
      ownerId: users[7].id,
    },
    {
      name: 'FitLife Gym & Fitness',
      description: 'Modern fitness center with state-of-the-art equipment, personal training, group classes, and wellness programs for all fitness levels.',
      category: 'Fitness',
      location: 'Eldoret',
      logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=400&fit=crop',
      contactPhone: '+254 778 901 234',
      contactEmail: 'info@fitlife.co.ke',
      website: 'www.fitlife.co.ke',
      rating: 4.8,
      reviewCount: 198,
      isVerified: true,
      isFeatured: false,
      status: BusinessStatus.ACTIVE,
      ownerId: users[8].id,
    },
  ]

  // Create featured businesses with gallery images
  for (const bizData of featuredBusinesses) {
    const { galleryImages, ...businessData } = bizData
    const business = await prisma.business.create({
      data: businessData,
    })
    businesses.push(business)

    // Create gallery images for the business
    if (galleryImages) {
      console.log(` Creating ${galleryImages.length} gallery images for ${business.name}...`)
      for (let i = 0; i < galleryImages.length; i++) {
        const url = galleryImages[i]
        if (url) { // Skip empty URLs
          await prisma.galleryImage.create({
            data: {
              url,
              thumbnailUrl: `${url}&w=300&h=200&fit=crop`,
              altText: `${business.name} - Image ${i + 1}`,
              caption: `${business.name} showcase ${i + 1}`,
              category: business.category,
              sizeType: i < 3 ? 'LARGE' : i < 10 ? 'MEDIUM' : 'SMALL',
              displayOrder: i,
              isFeatured: i < 5,
              metadata: { width: 1200, height: 800, format: 'jpg' },
              businessId: business.id,
            },
          })
        }
      }
    }
  }

  // Create additional businesses
  for (const bizData of additionalBusinesses) {
    const business = await prisma.business.create({
      data: bizData,
    })
    businesses.push(business)
  }

  console.log(' Creating services...')
  
  // Create services for each business with more variety
  const allServices = []
  for (const business of businesses) {
    const serviceCount = Math.floor(Math.random() * 5) + 3 // 3-7 services per business
    
    for (let i = 0; i < serviceCount; i++) {
      const service = await prisma.service.create({
        data: {
          name: `${business.category} Service ${i + 1}`,
          description: `Professional ${business.category.toLowerCase()} service offered by ${business.name}. We provide high-quality solutions tailored to your needs.`,
          price: Math.floor(Math.random() * 50000) + 5000,
          priceUnit: ['per hour', 'per session', 'per project', 'starting from'][Math.floor(Math.random() * 4)],
          duration: `${Math.floor(Math.random() * 5) + 1} ${['hours', 'days', 'weeks'][Math.floor(Math.random() * 3)]}`,
          category: business.category,
          tags: [business.category.toLowerCase(), 'professional', 'quality', 'service'],
          isAvailable: true,
          featuredImage: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 10000000)}?w=800&h=600&fit=crop`,
          businessId: business.id,
        },
      })
      allServices.push(service)
    }
  }

  console.log(' Creating 20+ job listings...')
  
  // Create job categories
  const jobCategories = await Promise.all([
    prisma.jobCategory.create({ data: { name: 'Technology', description: 'IT and Software jobs', icon: '💻' } }),
    prisma.jobCategory.create({ data: { name: 'Marketing', description: 'Marketing and Advertising', icon: '📈' } }),
    prisma.jobCategory.create({ data: { name: 'Finance', description: 'Finance and Accounting', icon: '💰' } }),
    prisma.jobCategory.create({ data: { name: 'Healthcare', description: 'Medical and Healthcare', icon: '🏥' } }),
    prisma.jobCategory.create({ data: { name: 'Education', description: 'Teaching and Education', icon: '📚' } }),
    prisma.jobCategory.create({ data: { name: 'Hospitality', description: 'Hotel and Tourism', icon: '🏨' } }),
    prisma.jobCategory.create({ data: { name: 'Sales', description: 'Sales and Business Development', icon: '📊' } }),
  ])

  // Sample job listings - fixed to use proper enums
  const jobListingsData = [
    {
      title: 'Senior React Developer',
      description: 'Lead frontend development using React, TypeScript, and modern web technologies.',
      company: 'TechVision Ltd',
      location: 'Nairobi, Remote',
      jobType: JobType.FULL_TIME,
      salaryMin: 5000,
      salaryMax: 8000,
      experienceLevel: ExperienceLevel.SENIOR,
    },
    {
      title: 'Digital Marketing Manager',
      description: 'Develop and execute digital marketing strategies across all channels.',
      company: 'GrowthHub Agency',
      location: 'Mombasa',
      jobType: JobType.FULL_TIME,
      salaryMin: 3000,
      salaryMax: 5000,
      experienceLevel: ExperienceLevel.MID,
    },
    {
      title: 'Financial Analyst',
      description: 'Analyze financial data and prepare reports.',
      company: 'FinancePro Solutions',
      location: 'Nairobi, CBD',
      jobType: JobType.FULL_TIME,
      salaryMin: 4000,
      salaryMax: 6000,
      experienceLevel: ExperienceLevel.MID,
    },
    {
      title: 'Junior Web Developer',
      description: 'Assist in building and maintaining web applications.',
      company: 'WebCraft Solutions',
      location: 'Nairobi, Remote',
      jobType: JobType.FULL_TIME,
      salaryMin: 1500,
      salaryMax: 2500,
      experienceLevel: ExperienceLevel.ENTRY,
    },
    {
      title: 'Project Manager',
      description: 'Lead project teams and ensure timely delivery.',
      company: 'ProjectPro Ltd',
      location: 'Mombasa',
      jobType: JobType.FULL_TIME,
      salaryMin: 4000,
      salaryMax: 7000,
      experienceLevel: ExperienceLevel.SENIOR,
    },
    {
      title: 'UX/UI Designer',
      description: 'Design user-friendly interfaces for web and mobile applications.',
      company: 'DesignHub Agency',
      location: 'Nairobi, Hybrid',
      jobType: JobType.FULL_TIME,
      salaryMin: 3500,
      salaryMax: 5500,
      experienceLevel: ExperienceLevel.MID,
    },
    {
      title: 'Data Scientist',
      description: 'Analyze complex datasets and build predictive models.',
      company: 'DataInsights Ltd',
      location: 'Remote',
      jobType: JobType.FULL_TIME,
      salaryMin: 6000,
      salaryMax: 9000,
      experienceLevel: ExperienceLevel.SENIOR,
    },
    {
      title: 'Customer Support Specialist',
      description: 'Provide excellent customer service and technical support.',
      company: 'SupportPro Solutions',
      location: 'Nairobi',
      jobType: JobType.FULL_TIME,
      salaryMin: 1200,
      salaryMax: 2000,
      experienceLevel: ExperienceLevel.ENTRY,
    },
    {
      title: 'DevOps Engineer',
      description: 'Manage infrastructure and CI/CD pipelines.',
      company: 'CloudTech Solutions',
      location: 'Nairobi, Remote',
      jobType: JobType.FULL_TIME,
      salaryMin: 5000,
      salaryMax: 8000,
      experienceLevel: ExperienceLevel.SENIOR,
    },
    {
      title: 'Content Writer',
      description: 'Create engaging content for websites and marketing materials.',
      company: 'ContentMasters Agency',
      location: 'Remote',
      jobType: JobType.PART_TIME,
      salaryMin: 1000,
      salaryMax: 2000,
      experienceLevel: ExperienceLevel.ENTRY,
    },
    {
      title: 'Sales Executive',
      description: 'Drive sales and build client relationships.',
      company: 'SalesForce Kenya',
      location: 'Nairobi',
      jobType: JobType.FULL_TIME,
      salaryMin: 2500,
      salaryMax: 4000,
      experienceLevel: ExperienceLevel.MID,
    },
    {
      title: 'Network Administrator',
      description: 'Manage and maintain company network infrastructure.',
      company: 'NetSecure Solutions',
      location: 'Nairobi',
      jobType: JobType.FULL_TIME,
      salaryMin: 3000,
      salaryMax: 5000,
      experienceLevel: ExperienceLevel.MID,
    },
    {
      title: 'Mobile App Developer',
      description: 'Develop cross-platform mobile applications.',
      company: 'AppCraft Ltd',
      location: 'Nairobi, Hybrid',
      jobType: JobType.FULL_TIME,
      salaryMin: 4000,
      salaryMax: 6500,
      experienceLevel: ExperienceLevel.MID,
    },
    {
      title: 'HR Manager',
      description: 'Oversee human resources operations and strategy.',
      company: 'PeopleFirst Ltd',
      location: 'Nairobi',
      jobType: JobType.FULL_TIME,
      salaryMin: 4500,
      salaryMax: 7000,
      experienceLevel: ExperienceLevel.SENIOR,
    },
    {
      title: 'Quality Assurance Engineer',
      description: 'Test software applications and ensure quality standards.',
      company: 'QualityAssure Ltd',
      location: 'Nairobi',
      jobType: JobType.FULL_TIME,
      salaryMin: 3000,
      salaryMax: 5000,
      experienceLevel: ExperienceLevel.MID,
    },
  ]

  const jobListings = []
  for (const jobData of jobListingsData) {
    const job = await prisma.jobListing.create({
      data: {
        ...jobData,
        salaryUnit: 'monthly',
        salaryCurrency: 'USD',
        educationLevel: EducationLevel.BACHELORS,
        requirements: ['Excellent communication skills', 'Team player', 'Problem-solving abilities'],
        benefits: ['Health insurance', 'Remote work options', 'Flexible hours', 'Learning budget', 'Performance bonuses'],
        isRemote: jobData.location.toLowerCase().includes('remote'),
        isFeatured: Math.random() > 0.3,
        status: JobStatus.ACTIVE,
        applicationDeadline: new Date(Date.now() + (Math.floor(Math.random() * 30) + 15) * 24 * 60 * 60 * 1000),
        views: Math.floor(Math.random() * 500) + 100,
        applications: Math.floor(Math.random() * 50) + 5,
        postedById: users[0].id,
        categories: {
          connect: [{ id: jobCategories[Math.floor(Math.random() * jobCategories.length)].id }],
        },
      },
    })
    jobListings.push(job)
  }

  console.log(' Creating job applications...')
  for (let i = 0; i < 15; i++) {
    await prisma.jobApplication.create({
      data: {
        coverLetter: `I am very interested in this position. With ${Math.floor(Math.random() * 5) + 2} years of relevant experience, I believe I would be a great fit for your team.`,
        resumeUrl: 'https://example.com/resumes/candidate.pdf',
        status: ApplicationStatus.PENDING,
        appliedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        jobId: jobListings[Math.floor(Math.random() * jobListings.length)].id,
        applicantId: users[Math.floor(Math.random() * 10) + 10].id, // Random job seeker
      },
    })
  }

  console.log(' Creating reviews...')
  for (let i = 0; i < 50; i++) {
    await prisma.review.create({
      data: {
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        title: ['Excellent service!', 'Highly recommended', 'Great experience', 'Professional team'][Math.floor(Math.random() * 4)],
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: Math.random() > 0.7 ? [`https://images.unsplash.com/photo-${Math.floor(Math.random() * 10000000)}?w=400&h=300&fit=crop`] : [],
        isVerified: Math.random() > 0.3,
        helpfulCount: Math.floor(Math.random() * 50),
        reviewerId: users[Math.floor(Math.random() * users.length)].id,
        businessId: businesses[Math.floor(Math.random() * businesses.length)].id,
      },
    })
  }

  console.log(' Creating saved items...')
  for (let i = 0; i < 20; i++) {
    await prisma.savedItem.create({
      data: {
        type: SavedItemType.BUSINESS,
        userId: users[Math.floor(Math.random() * 10) + 10].id,
        businessId: Math.random() > 0.5 ? businesses[Math.floor(Math.random() * businesses.length)].id : undefined,
        jobId: Math.random() > 0.5 ? jobListings[Math.floor(Math.random() * jobListings.length)].id : undefined,
      },
    })
  }

  console.log(' Enhanced database seeding completed successfully!')
  console.log(` Created:`)
  console.log(`    ${users.length} users`)
  console.log(`    ${businesses.length} businesses (${featuredBusinesses.length} featured with 20+ images each)`)
  console.log(`    ${allServices.length} services`)
  console.log(`    ${jobListings.length} job listings`)
  console.log(`    15 job applications`)
  console.log(`    50 reviews`)
  console.log(`    20 saved items`)
}

main()
  .catch((e) => {
    console.error(' Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })