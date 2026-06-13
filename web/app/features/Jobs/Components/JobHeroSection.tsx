"use client"

import React, { useEffect, useState } from 'react'
import { GoArrowLeft } from "react-icons/go"
import { useRouter } from 'next/navigation'
import { CiLocationOn } from "react-icons/ci";
import { ImJoomla } from "react-icons/im";
import { BsJournalBookmark } from "react-icons/bs";
import { GrWorkshop } from "react-icons/gr";


// Define types locally since we're using mock data
type Business = {
  id: string
  name: string
  description: string
  category: string
  location: string
  logo?: string
  contactPhone: string
  contactEmail: string
  rating: number
  reviewCount: number
  isVerified: boolean
  isFeatured: boolean
  status: string
  createdAt: string
  updatedAt: string
  owner?: {
    name: string
    email: string
  }
}

type JobListing = {
  id: string
  title: string
  description: string
  company: string
  location: string
  jobType: string
  salaryMin?: number
  salaryMax?: number
  salaryUnit?: string
  salaryCurrency?: string
  experienceLevel?: string
  educationLevel?: string
  requirements: string[]
  benefits: string[]
  isRemote: boolean
  isFeatured: boolean
  status: string
  applicationDeadline?: string
  views: number
  applications: number
  createdAt: string
  updatedAt: string
  business?: {
    name: string
    logo?: string
    location: string
  }
}

const JobHeroSection = () => {
  const router = useRouter()
  const [selectedJobFilters, setSelectedJobFilters] = useState<string[]>([])
  const [selectedBusinessFilters, setSelectedBusinessFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [jobListings, setJobListings] = useState<JobListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from API
  useEffect(() => {
    // Inside your useEffect, update the fetchData function:
const fetchData = async () => {
  try {
    setLoading(true)
    setError(null)
    console.log(' Fetching REAL data from APIs...')
    
    // Fetch businesses
    let businessesData: Business[] = []
    try {
      const businessesRes = await fetch('/api/Business', {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (businessesRes.ok) {
        const result = await businessesRes.json()
        console.log(`Business API: ${result.count} businesses found`)
        businessesData = result.data || []
        
        if (result.success === false) {
          setError('Business API error: ' + result.message)
        }
      } else {
        console.warn(`Business API returned ${businessesRes.status}`)
        setError('Failed to load businesses')
      }
    } catch (e: any) {
      console.error('Business API failed:', e.message)
      setError('Business API connection failed')
    }
    
    // Fetch jobs
    let jobsData: JobListing[] = []
    try {
      const jobsRes = await fetch('/api/jobs', {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (jobsRes.ok) {
        const result = await jobsRes.json()
        console.log(`Jobs API: ${result.count} jobs found`)
        jobsData = result.data || []
        
        if (result.success === false) {
          setError(prev => prev ? prev + ' | Jobs API error: ' + result.message : 'Jobs API error: ' + result.message)
        }
      } else {
        console.warn(`Jobs API returned ${jobsRes.status}`)
        setError(prev => prev ? prev + ' | Failed to load jobs' : 'Failed to load jobs')
      }
    } catch (e: any) {
      console.error('Jobs API failed:', e.message)
      setError(prev => prev ? prev + ' | Jobs API connection failed' : 'Jobs API connection failed')
    }
    
    // Set state with real data
    setBusinesses(businessesData)
    setJobListings(jobsData)
    
    console.log(` Loaded ${businessesData.length} businesses and ${jobsData.length} jobs (REAL DATA)`)
    
  } catch (error: any) {
    console.error(' Error in fetchData:', error)
    setError('Failed to load data from database')
  } finally {
    setLoading(false)
  }
}

    fetchData()
  }, [])

  // Mock data functions
  const getMockBusinesses = (): Business[] => [
    {
      id: 'biz_001',
      name: 'TechCorp Kenya',
      description: 'Leading technology solutions provider in East Africa',
      category: 'Technology',
      location: 'Nairobi, Kenya',
      logo: 'https://via.placeholder.com/150',
      contactPhone: '+254700000000',
      contactEmail: 'info@techcorp.co.ke',
      rating: 4.5,
      reviewCount: 120,
      isVerified: true,
      isFeatured: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'biz_002',
      name: 'Green Farms Ltd',
      description: 'Sustainable agriculture and organic farming',
      category: 'Agriculture',
      location: 'Nakuru, Kenya',
      logo: 'https://via.placeholder.com/150',
      contactPhone: '+254711111111',
      contactEmail: 'contact@greenfarms.co.ke',
      rating: 4.2,
      reviewCount: 89,
      isVerified: true,
      isFeatured: false,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'biz_003',
      name: 'Ocean View Hotel',
      description: 'Luxury beachfront hotel in Mombasa',
      category: 'Hospitality',
      location: 'Mombasa, Kenya',
      logo: 'https://via.placeholder.com/150',
      contactPhone: '+254722222222',
      contactEmail: 'reservations@oceanview.com',
      rating: 4.8,
      reviewCount: 256,
      isVerified: true,
      isFeatured: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  const getMockJobs = (): JobListing[] => [
    {
      id: 'job_001',
      title: 'Senior React Developer',
      description: 'Looking for an experienced React developer to join our team building modern web applications.',
      company: 'TechCorp Kenya',
      location: 'Nairobi',
      jobType: 'FULL_TIME',
      salaryMin: 250000,
      salaryMax: 400000,
      salaryUnit: 'monthly',
      salaryCurrency: 'KES',
      experienceLevel: 'SENIOR',
      educationLevel: 'BACHELORS',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Node.js knowledge'],
      benefits: ['Health insurance', 'Remote work options', 'Learning budget'],
      isRemote: true,
      isFeatured: true,
      status: 'ACTIVE',
      applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      views: 156,
      applications: 23,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      business: {
        name: 'TechCorp Kenya',
        logo: 'https://via.placeholder.com/150',
        location: 'Nairobi'
      }
    },
    {
      id: 'job_002',
      title: 'Marketing Manager',
      description: 'We are seeking a creative Marketing Manager to lead our marketing campaigns.',
      company: 'Growth Marketing Ltd',
      location: 'Mombasa',
      jobType: 'FULL_TIME',
      salaryMin: 180000,
      salaryMax: 280000,
      salaryUnit: 'monthly',
      salaryCurrency: 'KES',
      experienceLevel: 'MID',
      educationLevel: 'BACHELORS',
      requirements: ['3+ years marketing experience', 'Digital marketing skills', 'Team management'],
      benefits: ['Performance bonus', 'Flexible hours', 'Career growth'],
      isRemote: false,
      isFeatured: false,
      status: 'ACTIVE',
      views: 89,
      applications: 12,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'job_003',
      title: 'Data Analyst',
      description: 'Join our data team to analyze business metrics and provide insights.',
      company: 'Data Insights Co',
      location: 'Remote',
      jobType: 'CONTRACT',
      salaryMin: 150000,
      salaryMax: 220000,
      salaryUnit: 'monthly',
      salaryCurrency: 'KES',
      experienceLevel: 'MID',
      educationLevel: 'BACHELORS',
      requirements: ['SQL proficiency', 'Python/R knowledge', 'Data visualization'],
      benefits: ['Remote work', 'Training budget', 'Flexible schedule'],
      isRemote: true,
      isFeatured: true,
      status: 'ACTIVE',
      views: 120,
      applications: 18,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  // Filter options
  const jobFilters = {
    type: ["FULL_TIME", "PART_TIME", "CONTRACT", "REMOTE", "FREELANCE"],
    location: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Remote", "Hybrid"]
  }

  const businessFilters = {
    category: ["Technology", "Agriculture", "Hospitality", "Energy", "Creative", "Finance", "Healthcare", "Education"],
    location: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika"],
    featured: ["Featured Only", "All Businesses"]
  }

  // Toggle filter selection
  const toggleJobFilter = (filter: string) => {
    setSelectedJobFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const toggleBusinessFilter = (filter: string) => {
    setSelectedBusinessFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  // Filtered jobs based on selected filters
  const filteredJobs = jobListings.filter(job => {
    if (selectedJobFilters.length === 0) return true
    return selectedJobFilters.some(filter => {
      // Check job type
      if (jobFilters.type.includes(filter) && job.jobType === filter) return true
      // Check location
      if (jobFilters.location.includes(filter) && job.location.includes(filter)) return true
      // Check remote/hybrid
      if (filter === "Remote" && job.isRemote) return true
      if (filter === "Hybrid" && job.location.toLowerCase().includes("hybrid")) return true
      return false
    })
  })

  // Filtered businesses based on selected filters
  const filteredBusinesses = businesses.filter(business => {
    if (selectedBusinessFilters.length === 0) return true
    
    const hasCategoryFilter = selectedBusinessFilters.some(filter => 
      businessFilters.category.includes(filter) && business.category === filter
    )
    
    const hasLocationFilter = selectedBusinessFilters.some(filter => 
      businessFilters.location.includes(filter) && business.location.includes(filter)
    )
    
    const hasFeaturedFilter = selectedBusinessFilters.includes("Featured Only")
    
    if (hasFeaturedFilter && !business.isFeatured) return false
    
    return hasCategoryFilter || hasLocationFilter || (hasFeaturedFilter && business.isFeatured)
  })

  // Clear all filters
  const clearJobFilters = () => {
    setSelectedJobFilters([])
  }

  const clearBusinessFilters = () => {
    setSelectedBusinessFilters([])
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
        <div className="text-gray-600">Loading businesses and jobs...</div>
        <div className="text-sm text-gray-400 mt-2">This might take a moment</div>
      </div>
    )
  }

  return (
    <div className='px-4 py-8 w-full max-w-7xl mx-auto'>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <GoArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Find Your Dream Job</h1>
        </div>
        <p className="text-gray-600">
          Browse through {businesses.length} businesses and {jobListings.length} available positions
        </p>
        
        {error && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700">{error}</p>
            <p className="text-sm text-yellow-600 mt-1">
              Showing demo content. Data will load when APIs are available.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar with BOTH filters in single sticky container */}
        <div className="lg:w-1/4">
          <div className="sticky top-6 space-y-6">
            {/* Business Filters Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="mr-2 text-blue-600"><ImJoomla />
</span>
                  Business Filters
                </h2>
                {selectedBusinessFilters.length > 0 && (
                  <button 
                    onClick={clearBusinessFilters}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category and Location in Flex Row */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* Business Category Filters */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-3">Category</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {businessFilters.category.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`biz-category-${category}`}
                          checked={selectedBusinessFilters.includes(category)}
                          onChange={() => toggleBusinessFilter(category)}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                        <label 
                          htmlFor={`biz-category-${category}`}
                          className="ml-3 text-gray-600 hover:text-gray-900 cursor-pointer text-sm"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Location Filters */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-3">Location</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {businessFilters.location.map((location) => (
                      <div key={location} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`biz-location-${location}`}
                          checked={selectedBusinessFilters.includes(location)}
                          onChange={() => toggleBusinessFilter(location)}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                        <label 
                          htmlFor={`biz-location-${location}`}
                          className="ml-3 text-gray-600 hover:text-gray-900 cursor-pointer text-sm"
                        >
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured Filter - Below the row */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Status</h3>
                <div className="flex flex-wrap gap-4">
                  {businessFilters.featured.map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={`biz-${option}`}
                        name="business-status"
                        checked={selectedBusinessFilters.includes(option)}
                        onChange={() => {
                          // Remove other featured filters first
                          const otherFeatured = businessFilters.featured.filter(f => f !== option)
                          const filtered = selectedBusinessFilters.filter(f => !otherFeatured.includes(f))
                          if (!filtered.includes(option)) {
                            setSelectedBusinessFilters([...filtered, option])
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label 
                        htmlFor={`biz-${option}`}
                        className="ml-2 text-gray-600 hover:text-gray-900 cursor-pointer text-sm"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Business Filters */}
              {selectedBusinessFilters.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-3">Active Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBusinessFilters.map(filter => (
                      <span 
                        key={filter}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {filter}
                        <button 
                          onClick={() => toggleBusinessFilter(filter)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Business Results Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p>Showing <span className="font-semibold text-blue-600">{filteredBusinesses.length}</span> of {businesses.length} businesses</p>
                  {selectedBusinessFilters.length > 0 && (
                    <p className="mt-1 text-blue-600">Based on {selectedBusinessFilters.length} filter{selectedBusinessFilters.length > 1 ? 's' : ''}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Job Filters Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="mr-2 text-green-600"><GrWorkshop />
</span>
                  Job Filters
                </h2>
                {selectedJobFilters.length > 0 && (
                  <button 
                    onClick={clearJobFilters}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Job Type and Location in Flex Row */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* Job Type Filters */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-3">Job Type</h3>
                  <div className="space-y-2">
                    {jobFilters.type.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`job-type-${type}`}
                          checked={selectedJobFilters.includes(type)}
                          onChange={() => toggleJobFilter(type)}
                          className="h-4 w-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                        />
                        <label 
                          htmlFor={`job-type-${type}`}
                          className="ml-3 text-gray-600 hover:text-gray-900 cursor-pointer text-sm"
                        >
                          {type.replace('_', ' ')}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Location Filters */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-3">Location</h3>
                  <div className="space-y-2">
                    {jobFilters.location.map((location) => (
                      <div key={location} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`job-location-${location}`}
                          checked={selectedJobFilters.includes(location)}
                          onChange={() => toggleJobFilter(location)}
                          className="h-4 w-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                        />
                        <label 
                          htmlFor={`job-location-${location}`}
                          className="ml-3 text-gray-600 hover:text-gray-900 cursor-pointer text-sm"
                        >
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Remote Filter - Below the row */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Work Type</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remote-only"
                      checked={selectedJobFilters.includes("Remote")}
                      onChange={() => toggleJobFilter("Remote")}
                      className="h-4 w-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                    />
                    <label 
                      htmlFor="remote-only"
                      className="ml-2 text-gray-600 hover:text-gray-900 cursor-pointer text-sm"
                    >
                      Remote Only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hybrid-only"
                      checked={selectedJobFilters.includes("Hybrid")}
                      onChange={() => toggleJobFilter("Hybrid")}
                      className="h-4 w-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                    />
                    <label 
                      htmlFor="hybrid-only"
                      className="ml-2 text-gray-600 hover:text-gray-900 cursor-pointer text-sm"
                    >
                      Hybrid
                    </label>
                  </div>
                </div>
              </div>

              {/* Active Job Filters */}
              {selectedJobFilters.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-3">Active Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJobFilters.map(filter => (
                      <span 
                        key={filter}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        {filter.replace('_', ' ')}
                        <button 
                          onClick={() => toggleJobFilter(filter)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Job Results Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p>Showing <span className="font-semibold text-green-600">{filteredJobs.length}</span> of {jobListings.length} jobs</p>
                  {selectedJobFilters.length > 0 && (
                    <p className="mt-1 text-green-600">Based on {selectedJobFilters.length} filter{selectedJobFilters.length > 1 ? 's' : ''}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Right Side */}
        <div className="lg:w-3/4">
          {/* Businesses Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg ring-1 ring-gray-300 hover:ring-blue-300 bg-blue-100 hover:bg-blue-200 flex items-center justify-center mr-3">
                  <span className="text-blue-600 text-xl"><ImJoomla />
</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Featured Businesses</h2>
                  <p className="text-gray-600 text-sm">Find top companies to work with</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{filteredBusinesses.length}</div>
                <div className="text-sm text-gray-500">businesses found</div>
                {selectedBusinessFilters.length > 0 && (
                  <div className="text-xs text-blue-600 mt-1">
                    ({selectedBusinessFilters.length} filter{selectedBusinessFilters.length > 1 ? 's' : ''} applied)
                  </div>
                )}
              </div>
            </div>
            
            {filteredBusinesses.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                <div className="text-4xl mb-4">🏢</div>
                <p className="text-gray-500">No businesses found</p>
                {selectedBusinessFilters.length > 0 ? (
                  <p className="text-sm text-gray-400 mt-2">Try changing your filters</p>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">Check your API connection or add mock data</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <div 
                    key={business.id}
                    onClick={() => router.push(`/features/Jobs/${business.id}`)}
                    className='w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 hover:border-blue-400 transform hover:-translate-y-1'
                  >
                    <div className='h-40 bg-gray-100 flex items-center justify-center overflow-hidden'>
                      {business.logo ? (
                        <img 
                          src={business.logo} 
                          alt={business.name}
                          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 text-4xl"><BsJournalBookmark /></div>
                      )}
                      {business.isFeatured && (
                        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className='p-4'>
                      <div className='flex items-start justify-between mb-2'>
                        <h2 className='text-lg font-bold text-gray-800 line-clamp-1'>
                          {business.name}
                        </h2>
                        {business.category && (
                          <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap'>
                            {business.category}
                          </span>
                        )}
                      </div>
                      <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                        {business.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className='flex items-center text-gray-500 text-sm'>
                          <span className='mr-2'><CiLocationOn /></span>
                          <span className='line-clamp-1'>{business.location}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm text-gray-600">{business.rating.toFixed(1)} ({business.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Jobs Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg ring-1 ring-gray-200 hover:ring-green-400 hover:bg-green-200 bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 text-xl"><GrWorkshop />
</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Available Jobs</h2>
                  <p className="text-gray-600 text-sm">Find your next career opportunity</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{filteredJobs.length}</div>
                <div className="text-sm text-gray-500">jobs found</div>
                {selectedJobFilters.length > 0 && (
                  <div className="text-xs text-green-600 mt-1">
                    ({selectedJobFilters.length} filter{selectedJobFilters.length > 1 ? 's' : ''} applied)
                  </div>
                )}
              </div>
            </div>
            
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                <div className="text-4xl mb-4">💼</div>
                <p className="text-gray-500">No job listings found</p>
                {selectedJobFilters.length > 0 ? (
                  <p className="text-sm text-gray-400 mt-2">Try changing your filters</p>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">Check your API connection or add mock data</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div 
                    key={job.id}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-green-400 cursor-pointer"
                    onClick={() => {
                      // Build URL with query parameters
                      const params = new URLSearchParams()
                      params.set('filterCount', selectedJobFilters.length.toString())
                      params.set('filters', JSON.stringify(selectedJobFilters))
                      
                      // Use string URL with router.push
                      router.push(`/features/ApplyJobs/${job.id}?${params.toString()}`)
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          {job.business?.logo ? (
                            <img 
                              src={job.business.logo} 
                              alt={job.business.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg ring-1 ring-gray-100 flex items-center justify-center">
                              <span className="text-gray-400 text-xl"><BsJournalBookmark /></span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-xl text-gray-900">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                            {job.jobType ? job.jobType.replace('_', ' ') : 'Full Time'}
                          </span>
                          <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                            {job.experienceLevel || 'Any level'}
                          </span>
                          {job.isRemote && (
                            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                              Remote
                            </span>
                          )}
                          {job.isFeatured && (
                            <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="sm:text-right">
                        {job.salaryMin && job.salaryMax && (
                          <div className="text-lg font-bold text-gray-900 mb-2">
                            KES {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}
                            <span className="text-sm text-gray-600"> / {job.salaryUnit || 'month'}</span>
                          </div>
                        )}
                        <div className='flex items-center text-gray-500 text-sm mt-2'>
                          <span className='mr-2 text-2xl'><CiLocationOn /></span>
                          <span>{job.location}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          {job.applications || 0} applications • {job.views || 0} views
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobHeroSection