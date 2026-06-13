"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign,
  Briefcase,
  Calendar,
  Eye,
  Users,
  Building,
  CheckCircle,
  X,
  Upload,
  Mail,
  Phone,
  User,
  Loader,
  Share2,
  Bookmark
} from 'lucide-react'

// Types
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
    id: string
    name: string
    logo?: string
    location: string
    description?: string
    contactEmail?: string
    contactPhone?: string
  }
}

const ApplyJobPage = () => {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  
  const [job, setJob] = useState<JobListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [currentStep, setCurrentStep] = useState(1)
  const [pendingJob, setPendingJob] = useState<any>(null)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  
  // Get filter count from URL
  const filterCount = searchParams.get('filterCount')
  const filtersParam = searchParams.get('filters')
  const appliedFilters = filtersParam ? JSON.parse(filtersParam) : []

  const jobId = params?.jobId as string

  // Check for pending job after login
  useEffect(() => {
    // Check if user just logged in and there's a pending job in sessionStorage
    const storedJob = sessionStorage.getItem('pendingJob');
    const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
    
    if (status === "authenticated" && storedJob && redirectUrl === '/jobs') {
      const job = JSON.parse(storedJob);
      setPendingJob(job);
      setSelectedJob(job);
      setShowApplyModal(true);
      setShowLoginPrompt(false);
      // Clear the stored job
      sessionStorage.removeItem('pendingJob');
      sessionStorage.removeItem('redirectAfterLogin');
    }
  }, [status]);

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/jobs/${jobId}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch job: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.success) {
          setJob(result.data)
          setSelectedJob(result.data) // Also set selectedJob for the modal
        } else {
          setError(result.error || 'Failed to load job details')
        }
      } catch (err: any) {
        console.error('Error fetching job:', err)
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    if (jobId) {
      fetchJobDetails()
    }
  }, [jobId])

  // Format salary
  const formatSalary = () => {
    if (!job?.salaryMin || !job?.salaryMax) return 'Negotiable'
    
    const currency = job.salaryCurrency || 'KES'
    if (job.salaryMin > 100000) {
      return `${(job.salaryMin/1000).toFixed(0)}k - ${(job.salaryMax/1000).toFixed(0)}k ${currency}`
    }
    return `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${currency}`
  }

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Rolling'
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Handle apply click
  const handleApplyClick = () => {
    if (status === "unauthenticated") {
      setPendingJob(job);
      setShowLoginPrompt(true);
    } else if (status === "authenticated") {
      setSelectedJob(job);
      setShowApplyModal(true);
      setApplicationSubmitted(false);
      setCurrentStep(1);
    } else {
      // Loading state - wait for session
      console.log("Checking authentication...");
    }
  }

  // Handle login redirect
  const handleLoginRedirect = () => {
    if (pendingJob) {
      sessionStorage.setItem('pendingJob', JSON.stringify(pendingJob));
      sessionStorage.setItem('redirectAfterLogin', '/jobs');
    }
    router.push('/features/Auth/login');
  }

  // Handle continue as guest
  const handleContinueAsGuest = () => {
    setShowLoginPrompt(false);
    if (pendingJob) {
      setSelectedJob(pendingJob);
      setShowApplyModal(true);
      setApplicationSubmitted(false);
      setCurrentStep(1);
    }
    setPendingJob(null);
  }

  // Handle submit application
  const handleSubmitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formData.append('jobId', selectedJob.id)

    try {
      const response = await fetch('/api/ApplyJob/Apply', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      
      if (result.success) {
        setApplicationSubmitted(true);
        setTimeout(() => {
          setShowApplyModal(false);
          setSelectedJob(null);
          setApplicationSubmitted(false);
          setCurrentStep(1);
        }, 2000);
      } else {
        if (result.error === 'Unauthorized') {
          setShowApplyModal(false);
          setPendingJob(selectedJob);
          setShowLoginPrompt(true);
        } else {
          alert('Failed to submit application. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  // Get time ago
  const timeAgo = (dateString: string) => {
    const posted = new Date(dateString)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Just posted'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffHours < 48) return 'Yesterday'
    return `${Math.floor(diffHours / 24)}d ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="h-96 bg-gray-100 rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="text-gray-400" size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Job Not Found</h2>
          <p className="text-gray-500 mb-8">
            The position you're looking for might have been filled or removed.
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Filter Banner */}
      {filterCount && parseInt(filterCount) > 0 && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{filterCount}</span> filter{parseInt(filterCount) > 1 ? 's' : ''} applied
              </p>
              <button
                onClick={() => router.back()}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <ArrowLeft size={14} />
                Back to results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-gray-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign in to apply</h3>
              <p className="text-gray-500 text-sm">
                Create an account or sign in to submit your application.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleLoginRedirect}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={handleContinueAsGuest}
                className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Continue as guest
              </button>
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                  setPendingJob(null);
                }}
                className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-gray-600 mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span className="text-sm">Back</span>
        </button>

        {/* Job Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-light text-gray-900">{job.title}</h1>
                {job.isFeatured && (
                  <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full border border-yellow-200">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-900 font-medium">{job.company}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500 flex items-center">
                  <MapPin size={14} className="mr-1" />
                  {job.location}
                </span>
                {job.isRemote && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-green-600">Remote</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-6">
            <span className="flex items-center">
              <Clock size={16} className="mr-2" />
              Posted {timeAgo(job.createdAt)}
            </span>
            <span className="flex items-center">
              <Eye size={16} className="mr-2" />
              {job.views} views
            </span>
            <span className="flex items-center">
              <Users size={16} className="mr-2" />
              {job.applications} applicants
            </span>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Salary</p>
            <p className="text-sm font-medium text-gray-900">{formatSalary()}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Job Type</p>
            <p className="text-sm font-medium text-gray-900">
              {job.jobType?.replace('_', ' ') || 'Full Time'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Experience</p>
            <p className="text-sm font-medium text-gray-900">
              {job.experienceLevel || 'Not specified'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Deadline</p>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(job.applicationDeadline)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'description' 
                  ? 'text-gray-900' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'requirements' 
                  ? 'text-gray-900' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Requirements
              {activeTab === 'requirements' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'benefits' 
                  ? 'text-gray-900' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Benefits
              {activeTab === 'benefits' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none text-gray-600">
              {job.description.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          )}

          {activeTab === 'requirements' && job.requirements && (
            <ul className="space-y-3">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="text-gray-400 text-lg leading-none">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'benefits' && job.benefits && (
            <ul className="space-y-3">
              {job.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <CheckCircle size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Company Info */}
        {job.business && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                {job.business.logo ? (
                  <img 
                    src={job.business.logo} 
                    alt={job.business.name}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <Building className="text-gray-400" size={24} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">About {job.business.name}</h3>
                {job.business.description && (
                  <p className="text-sm text-gray-600 mb-3">{job.business.description}</p>
                )}
                <div className="flex flex-wrap gap-4 text-sm">
                  {job.business.location && (
                    <span className="text-gray-500 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {job.business.location}
                    </span>
                  )}
                  {job.business.contactEmail && (
                    <a 
                      href={`mailto:${job.business.contactEmail}`}
                      className="text-gray-500 hover:text-gray-900 flex items-center"
                    >
                      <Mail size={14} className="mr-1" />
                      {job.business.contactEmail}
                    </a>
                  )}
                  {job.business.contactPhone && (
                    <a 
                      href={`tel:${job.business.contactPhone}`}
                      className="text-gray-500 hover:text-gray-900 flex items-center"
                    >
                      <Phone size={14} className="mr-1" />
                      {job.business.contactPhone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="flex justify-center">
          <button
            onClick={handleApplyClick}
            className="px-8 py-4 ring-1 ring-gray-400 text-gray-600 rounded-xl font-medium hover:bg-gray-800/40 hover:text-white transition-colors shadow-sm hover:shadow-md"
          >
            Apply for this position
          </button>
        </div>
      </div>

      {/* Application Modal */}
       {showApplyModal && selectedJob && (
             <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-0 z-50">
               <div className="w-full h-full md:max-w-4xl md:h-[90vh] md:rounded-xl overflow-hidden flex flex-col bg-whte/90 backdrop-blur-xl border border-white/20 shadow-2xl">
                 {/* Header - Glass */}
                 <div className="flex items-center justify-between px-6 py-5 border-b border-white/20 bg-white/50 backdrop-blur-md">
                   <div>
                     <h2 className="text-xl font-semibold text-gray-900">Apply for this position</h2>
                     <p className="text-sm text-gray-600 mt-1">{selectedJob.title} · {selectedJob.company}</p>
                   </div>
                   <button 
                     onClick={() => setShowApplyModal(false)} 
                     className="text-gray-500 hover:text-gray-700 p-2 hover:bg-black/50 rounded-full transition-colors"
                     aria-label="Close"
                   >
                     <X size={24} />
                   </button>
                 </div>
     
                 {!applicationSubmitted ? (
                   <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                     {/* Sidebar - Glass */}
                     <div className="hidden md:block w-64 bg-white/50 backdrop-blur-md p-6 border-r border-white/20">
                       <div className="mb-8">
                         <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Application progress</h3>
                         <div className="space-y-6 ">
                           {[
                             { num: 1, name: 'Personal Information', desc: 'Your contact details' },
                             { num: 2, name: 'Documents', desc: 'Resume & cover letter' },
                             { num: 3, name: 'Professional Details', desc: 'Experience & education' },
                             { num: 4, name: 'Additional Info', desc: 'Salary, notice period, etc.' }
                           ].map((step) => (
                             <div key={step.num} className="flex items-start gap-3">
                               <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 backdrop-blur-sm ${
                                 step.num === currentStep
                                   ? 'bg-[#0B5D1E]/90 text-white'
                                   : step.num < currentStep
                                   ? 'bg-green-100/80 text-[#0B5D1E]'
                                   : 'bg-white/50 text-gray-400 border border-white/30'
                               }`}>
                                 {step.num < currentStep ? '✓' : step.num}
                               </div>
                               <div>
                                 <p className={`text-sm font-medium ${
                                   step.num === currentStep ? 'text-gray-600' : 'text-gray-900'
                                 }`}>{step.name}</p>
                                 <p className="text-xs text-gray-700 mt-0.5">{step.desc}</p>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     </div>
     
                     {/* Main Content - Glass */}
                     <div className="flex-1 overflow-y-auto bg-white/30 backdrop-blur-sm">
                       {/* Mobile Progress Bar */}
                       <div className="md:hidden p-4 border-b border-white/20 bg-white/40">
                         <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-medium text-[#0B5D1E]">Step {currentStep} of 4</span>
                           <span className="text-xs text-gray-500">{Math.round((currentStep / 4) * 100)}% complete</span>
                         </div>
                         <div className="w-full bg-white/50 h-1.5 rounded-full backdrop-blur-sm">
                           <div 
                             className="bg-[#0B5D1E] h-1.5 rounded-full transition-all duration-300"
                             style={{ width: `${(currentStep / 4) * 100}%` }}
                           />
                         </div>
                       </div>
     
                       <form onSubmit={handleSubmitApplication} id="applicationForm" className="p-6 md:p-8">
                         {/* Step 1: Personal Info */}
                         {currentStep === 1 && (
                           <div className="max-w-2xl mx-auto space-y-6">
                             <div className="mb-6">
                               <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                               <p className="text-sm text-gray-800 mt-1">Let's start with the basics</p>
                             </div>
     
                             <div>
                               <label className="block  text-sm font-medium text-gray-800 mb-1.5">
                                 Full name <span className="text-green-700">*</span>
                               </label>
                               <input 
                                 type="text" 
                                 name="fullName" 
                                 placeholder="e.g., John Kamau"
                                 required 
                                 className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c transition-colors"
                               />
                             </div>
     
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                 Email address <span className="text-green-700">*</span>
                               </label>
                               <input 
                                 type="email" 
                                 name="email" 
                                 placeholder="you@example.com"
                                 required 
                                 className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c] transition-colors"
                               />
                               <p className="text-sm text-gray-700 mt-1.5">We'll send you application updates</p>
                             </div>
     
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                 Phone number <span className="text-green-700">*</span>
                               </label>
                               <div className="flex">
                                 <span className="inline-flex items-center px-4 bg-white/50 backdrop-blur-sm border  border-white/30 rounded-l-lg  text-gray-600">
                                   +254
                                 </span>
                                 <input 
                                   type="tel" 
                                   name="phone"
                                   placeholder="743 861 565"
                                   pattern="[0-9]{9}"
                                   title="Please enter 9 digits"
                                   required 
                                   className="flex-1 bg-white/50 backdrop-blur-sm border border-white/30 rounded-r-lg px-4 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c] transition-colors"
                                 />
                               </div>
                             </div>
                           </div>
                         )}
     
                         {/* Step 2: Documents */}
                         {currentStep === 2 && (
                           <div className="max-w-2xl mx-auto space-y-6">
                             <div className="mb-6">
                               <h3 className="text-lg font-medium text-gray-900">Documents</h3>
                               <p className="text-sm text-gray-600 mt-1">Upload your resume and cover letter</p>
                             </div>
     
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                 Resume/CV <span className="text-green-700">*</span>
                               </label>
                               <div className="border-2 border-dashed border-white/30 rounded-xl p-8 hover:border-[#0B5D1E]/50 transition-colors group bg-white/30 backdrop-blur-sm">
                                 <input 
                                   type="file" 
                                   name="resume" 
                                   id="resume-upload"
                                   accept=".pdf,.doc,.docx" 
                                   required 
                                   className="hidden"
                                 />
                                 <label 
                                   htmlFor="resume-upload"
                                   className="cursor-pointer flex flex-col items-center"
                                 >
                                   <Upload size={32} className="text-gray-400 group-hover:text-[#0B5D1E] transition-colors" />
                                   <span className="text-gray-800 font-medium  mt-3 group-hover:text-[#0B5D1E] transition-colors">
                                     Click to upload or drag and drop
                                   </span>
                                   <span className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX up to 5MB</span>
                                 </label>
                               </div>
                             </div>
     
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                 Cover letter <span className="text-gray-400 text-sm font-normal">(optional)</span>
                               </label>
                               <textarea 
                                 name="coverLetter" 
                                 rows={6}
                                 placeholder="Tell us why you're interested in this position and what makes you a great candidate..."
                                 className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c] transition-colors resize-none"
                               />
                             </div>
                           </div>
                         )}
     
                         {/* Step 3: Professional Details */}
                         {currentStep === 3 && (
                           <div className="max-w-2xl mx-auto space-y-6">
                             <div className="mb-6">
                               <h3 className="text-lg font-medium text-gray-900">Professional Details</h3>
                               <p className="text-sm text-gray-900 mt-1">Tell us about your experience</p>
                             </div>
     
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                 Current/Most recent role <span className="text-green-700">*</span>
                               </label>
                               <input 
                                 type="text" 
                                 name="currentRole" 
                                 placeholder="e.g., Software Developer at Safaricom"
                                 required 
                                 className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c] transition-colors"
                               />
                             </div>
     
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                 Years of experience <span className="text-green-700">*</span>
                               </label>
                               <select 
                                 name="experience" 
                                 required 
                                 className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c]"
                               >
                                 <option value="">Select years of experience</option>
                                 <option value="0-1">Less than 1 year</option>
                                 <option value="1-2">1-2 years</option>
                                 <option value="3-5">3-5 years</option>
                                 <option value="5-8">5-8 years</option>
                                 <option value="8+">8+ years</option>
                               </select>
                             </div>
     
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                 Highest education <span className="text-green-700">*</span>
                               </label>
                               <select 
                                 name="education" 
                                 required 
                                 className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c] "
                               >
                                 <option value="">Select education level</option>
                                 <option value="certificate">Certificate</option>
                                 <option value="diploma">Diploma</option>
                                 <option value="degree">Bachelor's Degree</option>
                                 <option value="masters">Master's Degree</option>
                                 <option value="doctorate">Doctorate</option>
                               </select>
                             </div>
                           </div>
                         )}
     
                         {/* Step 4: Additional Info */}
                         {currentStep === 4 && (
                           <div className="max-w-2xl mx-auto space-y-6">
                             <div className="mb-6">
                               <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
                               <p className="text-sm text-gray-600 mt-1">Almost done! Just a few more details</p>
                             </div>
     
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                   Notice period
                                 </label>
                                 <select 
                                   name="noticePeriod" 
                                   className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c] "
                                 >
                                   <option value="immediate">Immediate</option>
                                   <option value="1week">1 week</option>
                                   <option value="2weeks">2 weeks</option>
                                   <option value="1month">1 month</option>
                                   <option value="2months">2 months</option>
                                   <option value="3months">3 months</option>
                                 </select>
                               </div>
     
                               <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                   Expected salary <span className="text-gray-400 text-sm font-normal">(optional)</span>
                                 </label>
                                 <div className="flex items-center gap-3">
                                   <div className="relative flex-1">
                                     <span className="absolute left-3 top-3  text-gray-600">KES</span>
                                     <input 
                                       type="number" 
                                       name="expectedSalary" 
                                       placeholder="150,000"
                                       className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg pl-14 pr-3 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c] "
                                     />
                                   </div>
                                   <span className="text-gray-600">/month</span>
                                 </div>
                               </div>
                             </div>
     
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                 LinkedIn / Portfolio <span className=" text-sm font-normal">(optional)</span>
                               </label>
                               <input 
                                 type="url" 
                                 name="portfolio" 
                                 placeholder="https://linkedin.com/in/username"
                                 className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c] "
                               />
                             </div>
     
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                 How did you hear about us? <span className=" text-sm font-normal">(optional)</span>
                               </label>
                               <select 
                                 name="referral"
                                 className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c] "
                               >
                                 <option value="">Select source</option>
                                 <option value="linkedin">LinkedIn</option>
                                 <option value="website">Company website</option>
                                 <option value="friend">Friend/Colleague</option>
                                 <option value="email">Email newsletter</option>
                                 <option value="social">Social media</option>
                                 <option value="other">Other</option>
                               </select>
                             </div>
     
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                 Work authorization <span className="text-green-700">*</span>
                               </label>
                               <select 
                                 name="workAuth" 
                                 required 
                                 className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:border-[#8d8c8c] focus:ring-1 focus:ring-[#7c7c7c] "
                               >
                                 <option value="">Select authorization</option>
                                 <option value="citizen">Kenyan citizen</option>
                                 <option value="permanent">Permanent resident</option>
                                 <option value="workpermit">Valid work permit</option>
                                 <option value="other">Other authorization</option>
                               </select>
                             </div>
     
                             <div className="flex items-center gap-3 pt-4">
                               <input 
                                 type="checkbox" 
                                 id="relocate" 
                                 name="relocate"
                                 className="w-5 h-5 rounded border-green-400 bg-green-500 text-[#0B5D1E] focus:ring-[#0B5D1E]"
                               />
                               <label htmlFor="relocate" className="text-gray-600 ">
                                 Willing to relocate for this position
                               </label>
                             </div>
     
                             <div className="flex items-start gap-3 pt-4 border-t border-white/20">
                               <input 
                                 type="checkbox" 
                                 id="consent" 
                                 name="consent"
                                 required
                                 className="mt-0.5 w-5 h-5 rounded border-white/30 bg-white text-[#0B5D1E] focus:ring-[#0B5D1E]"
                               />
                               <label htmlFor="consent" className="text-gray-600  leading-relaxed">
                                 I confirm that the information provided is accurate and I agree to the <button type="button" className="text-[#0B5D1E] hover:underline font-medium">terms and conditions</button>.
                               </label>
                             </div>
                           </div>
                         )}
     
                         {/* Navigation Buttons */}
                         <div className="max-w-2xl mx-auto mt-8 pt-6 border-t border-white/20">
                           <div className="flex items-center justify-between gap-3">
                             <div className="flex gap-2">
                               {currentStep > 1 && (
                                 <button
                                   type="button"
                                   onClick={() => setCurrentStep(currentStep - 1)}
                                   className="px-6 py-2.5 ring-1 ring-white/80 backdrop-blur-sm border border-white/30 rounded-lg text-sm font-medium text-gray-700 hover:bg-white/70 transition-colors"
                                   disabled={submitting}
                                 >
                                   Previous
                                 </button>
                               )}
                               
                               {currentStep === 1 && (
                                 <button
                                   type="button"
                                   onClick={() => setShowApplyModal(false)}
                                   className="px-6 py-2.5 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg text-sm font-medium text-gray-700 hover:bg-white/70 transition-colors"
                                   disabled={submitting}
                                 >
                                   Cancel
                                 </button>
                               )}
                             </div>
     
                             {currentStep < 4 ? (
                               <button
                                 type="button"
                                 onClick={() => setCurrentStep(currentStep + 1)}
                                 className="px-8 py-2.5 ring-1 ring-white/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-[#859c8b] transition-colors shadow-sm"
                                 disabled={submitting}
                               >
                                 Next step
                               </button>
                             ) : (
                               <button
                                 type="submit"
                                 form="applicationForm"
                                 disabled={submitting}
                                 className="px-8 py-2.5 bg-[#0B5D1E]/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-[#0B5D1E] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                               >
                                 {submitting ? (
                                   <>
                                     <Loader size={16} className="animate-spin" />
                                     Submitting...
                                   </>
                                 ) : (
                                   'Submit application'
                                 )}
                               </button>
                             )}
                           </div>
                         </div>
                       </form>
                     </div>
                   </div>
                 ) : (
                   <div className="flex-1 flex items-center justify-center bg-white/30 backdrop-blur-md p-8">
                     <div className="max-w-md text-center">
                       <div className="w-20 h-20 bg-green-100/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                         <CheckCircle className="text-green-600" size={40} />
                       </div>
                       <h3 className="text-2xl font-semibold text-gray-900 mb-3">Application sent!</h3>
                       <p className="text-gray-600 text-gray-600 mb-8">
                         Your application for <span className="font-medium text-gray-700">{selectedJob.title}</span> at <span className="font-medium text-gray-700">{selectedJob.company}</span> has been successfully submitted.
                       </p>
                       <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-8 text-left border border-white/20">
                         <p className="text-sm font-medium text-gray-700 mb-3">What happens next?</p>
                         <ul className="space-y-2 text-sm text-gray-600">
                           <li className="flex items-start gap-2">
                             <span className="text-[#0B5D1E] mt-0.5">✓</span>
                             <span>You'll receive a confirmation email shortly</span>
                           </li>
                           <li className="flex items-start gap-2">
                             <span className="text-[#0B5D1E] mt-0.5">✓</span>
                             <span>The hiring team will review your application</span>
                           </li>
                           <li className="flex items-start gap-2">
                             <span className="text-[#0B5D1E] mt-0.5">✓</span>
                             <span>If shortlisted, they'll contact you within 5-7 days</span>
                           </li>
                         </ul>
                       </div>
                       <div className="flex gap-3 justify-center">
                         <button 
                           onClick={() => setShowApplyModal(false)}
                           className="px-6 py-2.5 bg-[#0B5D1E]/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-[#0B5D1E] transition-colors"
                         >
                           Browse more jobs
                         </button>
                         <button 
                           onClick={() => {
                             setShowApplyModal(false);
                             router.push('/applications');
                           }}
                           className="px-6 py-2.5 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg text-sm font-medium text-gray-700 hover:bg-white/70 transition-colors"
                         >
                           View my applications
                         </button>
                       </div>
                     </div>
                   </div>
                 )}
               </div>
             </div>
           )}
    </div>
  )
}

export default ApplyJobPage