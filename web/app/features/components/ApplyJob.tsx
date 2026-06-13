"use client"
import React, { useState, useEffect } from 'react'
import { Briefcase, MapPin, Clock, DollarSign, Building, X, CheckCircle, Upload, Loader, Bookmark, Eye, Calendar, Search, Filter, SlidersHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { BsJournalBookmark } from "react-icons/bs";
import { useSession, SessionProvider } from 'next-auth/react';

interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  salaryUnit: string;
  salaryCurrency: string;
  experienceLevel: string;
  educationLevel: string;
  requirements: string[];
  benefits: string[];
  isRemote: boolean;
  isFeatured: boolean;
  status: string;
  applicationDeadline: string;
  views: number;
  applications: number;
  createdAt: string;
  updatedAt: string;
  business: {
    id: string;
    name: string;
    logo: string | null;
  };
}

// Inner component that uses useSession
const JobsPageContent = () => {
  const { data: session, status } = useSession();
  const [selectedJob, setSelectedJob] = useState<any | null>(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedExperience, setSelectedExperience] = useState('')
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [pendingJob, setPendingJob] = useState<any | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        
        const params = new URLSearchParams()
        if (selectedType) params.append('jobType', selectedType)
        if (selectedLocation) params.append('location', selectedLocation)
        if (selectedExperience) params.append('experienceLevel', selectedExperience)
        if (remoteOnly) params.append('isRemote', 'true')
        if (searchTerm) params.append('search', searchTerm)
        
        const response = await fetch(`/api/jobs?${params.toString()}`)
        const result = await response.json()
        
        if (result.success) {
          const formattedJobs = result.data.map((job: any) => ({
            id: job.id,
            title: job.title,
            company: job.business?.name || job.company,
            location: job.location,
            type: job.jobType?.replace('_', ' ') || 'Full time',
            salary: formatSalary(job),
            posted: timeAgo(job.createdAt),
            description: job.description,
            requirements: job.requirements || [],
            isRemote: job.isRemote,
            isFeatured: job.isFeatured,
            deadline: job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' }) : 'Rolling',
            experienceLevel: job.experienceLevel?.replace('_', ' ') || 'Entry Level',
            views: job.views || Math.floor(Math.random() * 150) + 30,
            applications: job.applications || Math.floor(Math.random() * 20)
          }))
          setJobs(formattedJobs)
        } else {
          setError('Failed to fetch jobs')
        }
      } catch (err) {
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [selectedLocation, selectedType, selectedExperience, remoteOnly, searchTerm])

  const formatSalary = (job: any) => {
    const currency = job.salaryCurrency || 'KES'
    if (job.salaryMin && job.salaryMax) {
      if (job.salaryMin > 100000) {
        return `${(job.salaryMin/1000).toFixed(0)}k - ${(job.salaryMax/1000).toFixed(0)}k ${currency}`
      }
      return `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${currency}`
    }
    return 'Negotiable'
  }

  const timeAgo = (dateString: string) => {
    const posted = new Date(dateString)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Just posted'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffHours < 48) return 'Yesterday'
    return `${Math.floor(diffHours / 24)}d ago`
  }

  const handleApplyClick = (job: any) => {
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

  const handleLoginRedirect = () => {
    // Save the current job in sessionStorage to redirect back after login
    if (pendingJob) {
      sessionStorage.setItem('pendingJob', JSON.stringify(pendingJob));
      sessionStorage.setItem('redirectAfterLogin', '/jobs');
    }
    router.push('/features/Auth/login');
  }

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

  const handleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  const handleSubmitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)

    // Add job id to form data
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
          // Session expired or not authenticated
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

  const clearFilters = () => {
    setSelectedLocation('')
    setSelectedType('')
    setSelectedExperience('')
    setRemoteOnly(false)
    setSearchTerm('')
  }

  const locations = [...new Set(jobs.map(job => job.location))]

  const activeFiltersCount = [
    selectedLocation, 
    selectedType, 
    selectedExperience, 
    remoteOnly,
    searchTerm
  ].filter(Boolean).length

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-gray-300 mx-auto mb-3" size={28} />
          <p className="text-sm text-gray-400">Loading jobs</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-3">Unable to load jobs</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign in to apply</h3>
              <p className="text-gray-600">
                You need to be signed in to apply for this position. Sign in or create an account to continue.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleLoginRedirect}
                className="w-full bg-[#0B5D1E] text-white py-3 rounded-lg font-medium hover:bg-[#0a4c1a] transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={handleContinueAsGuest}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue as guest
              </button>
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                  setPendingJob(null);
                }}
                className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
            
            <p className="text-xs text-gray-400 text-center mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-xl font-medium text-gray-900">Jobs</h1>
        </div>
      </div>

      {/* Rest of your UI - exactly as you had it */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 flex items-center gap-2 bg-white text-gray-500 border rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or keywords"
              className="w-full text-gray-500 bg-transparent text-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Mobile Filter Button */}
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal size={18} className="text-gray-500" />
            {activeFiltersCount > 0 && (
              <span className="bg-[#0B5D1E] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Bar - Desktop */}
        <div className="hidden lg:flex items-center gap-3 mb-6">
          <span className="text-sm text-gray-500">Filter by:</span>
          
          <select
            className="border rounded-lg px-3 py-2 text-gray-500 text-sm bg-white min-w-[140px]"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          
          <select
            className="border rounded-lg text-gray-500 px-3 py-2 text-sm bg-white min-w-[140px]"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All job types</option>
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERNSHIP">Internship</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2  text-sm text-gray-500 bg-white min-w-[140px]"
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
          >
            <option value="">All experience</option>
            <option value="ENTRY">Entry level</option>
            <option value="MID">Mid level</option>
            <option value="SENIOR">Senior level</option>
            <option value="LEAD">Lead / Manager</option>
          </select>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
              className="rounded border-gray-300 text-[#0B5D1E] focus:ring-[#0B5D1E]"
            />
            Remote only
          </label>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-400 hover:text-gray-600 underline ml-2"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="lg:hidden  bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500text-gray-500 font-medium">Filters</span>
              <button onClick={() => setShowMobileFilters(false)}>
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <select
              className="w-full border rounded-lg text-gray-500 px-3 py-2  text-sm bg-white"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            
            <select
              className="w-full border text-gray-500 rounded-lg  px-3 py-2 text-sm bg-white"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All job types</option>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>

            <select
              className="w-full border rounded-lg text-gray-500 px-3 py-2 text-sm bg-white"
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              <option value="">All experience</option>
              <option value="ENTRY">Entry level</option>
              <option value="MID">Mid level</option>
              <option value="SENIOR">Senior level</option>
              <option value="LEAD">Lead / Manager</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="rounded border-gray-300 text-[#0B5D1E] focus:ring-[#0B5D1E]"
              />
              Remote only
            </label>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-[#0B5D1E] font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">{jobs.length}</span> job{jobs.length !== 1 ? 's' : ''} found
          </p>
          
          <select className="text-sm border-0 bg-transparent text-gray-500 focus:ring-0">
            <option>Most recent</option>
            <option>Salary: High to low</option>
            <option>Salary: Low to high</option>
          </select>
        </div>

        {/* Job Listings */}
        {jobs.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <Briefcase className="mx-auto text-gray-300 mb-3" size={32} />
            <p className="text-sm text-gray-500 mb-2">No jobs match your filters</p>
            <button 
              onClick={clearFilters}
              className="text-sm text-[#0B5D1E] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="flex gap-4">
                  {/* Logo */}
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {job.company.logo ? (
                      <img src={job.company.logo} alt="" className="w-8 h-8 object-contain" />
                    ) : (
                      <span className="text-gray-400 text-xl"><BsJournalBookmark /></span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-medium text-gray-900">{job.title}</h2>
                          {job.isFeatured && (
                            <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full border border-yellow-200">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                      </div>
                      <button 
                        onClick={() => handleSaveJob(job.id)}
                        className={`p-1.5 rounded hover:bg-gray-50 ${
                          savedJobs.includes(job.id) ? 'text-[#0B5D1E]' : 'text-gray-300'
                        }`}
                      >
                        <Bookmark size={18} fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mt-2">
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Briefcase size={14} className="mr-1" />
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <DollarSign size={14} className="mr-1" />
                        {job.salary}
                      </span>
                      {job.isRemote && (
                        <span className="flex items-center text-green-600">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>
                          Remote
                        </span>
                      )}
                    </div>

                    {/* Experience Level */}
                    <div className="mt-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {job.experienceLevel}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <button 
                        onClick={() => handleApplyClick(job)}
                        className="ring-1 ring-[#0B5D1E]  text-green-500/90 px-5 py-1.5 rounded hover:text-white text-sm hover:bg-[#097422] transition-colors"
                      >
                        Apply now
                      </button>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center">
                          <Eye size={14} className="mr-1" />
                          {job.views} views
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {job.posted}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Modal - Your exact UI */}
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

// Main export with SessionProvider wrapper
const JobsPage = () => {
  return (
    <SessionProvider>
      <JobsPageContent />
    </SessionProvider>
  )
}

export default JobsPage