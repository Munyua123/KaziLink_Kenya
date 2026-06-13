"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, Mail, Lock, Eye, EyeOff, User, Phone, Briefcase, 
  Calendar, Building2, MapPin, Globe, Users, FileText, Award,
  Plus, X
} from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
 const [loading,setLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    // Common fields
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'jobseeker',
    agreeTerms: false,
    
    // Job seeker specific
    skills: [] as string[],
    currentSkill: '',
    experience: '',
    education: '',
    expectedSalary: '',
    jobType: '',
    location: '',
    
    // Employer specific
    companyName: '',
    companySize: '',
    industry: '',
    companyWebsite: '',
    companyDescription: '',
    companyLocation: '',
    contactPosition: ''
  })

  const handleChange =  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleAddSkill = () => {
    if (formData.currentSkill.trim() && !formData.skills.includes(formData.currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.currentSkill.trim()],
        currentSkill: ''
      }))
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match')
        setLoading(false)
        return
    }

    // Validate required fields based on account type
    if (formData.accountType === 'jobseeker') {
        if (!formData.skills.length) {
            alert('Please add at least one skill')
            setLoading(false)
            return
        }
        if (!formData.experience) {
            alert('Please select your experience level')
            setLoading(false)
            return
        }
        if (!formData.education) {
            alert('Please select your education level')
            setLoading(false)
            return
        }
    } else if (formData.accountType === 'employer') {
        if (!formData.companyName) {
            alert('Please enter your company name')
            setLoading(false)
            return
        }
        if (!formData.companySize) {
            alert('Please select your company size')
            setLoading(false)
            return
        }
        if (!formData.industry) {
            alert('Please select your industry')
            setLoading(false)
            return
        }
        if (!formData.companyLocation) {
            alert('Please enter your company location')
            setLoading(false)
            return
        }
        if (!formData.companyDescription) {
            alert('Please enter your company description')
            setLoading(false)
            return
        }
        if (!formData.contactPosition) {
            alert('Please enter your position')
            setLoading(false)
            return
        }
    }

    try {
        console.log(' Sending registration data:', {
            ...formData,
            password: '[REDACTED]',
            confirmPassword: '[REDACTED]'
        })

        const response = await fetch('/api/Auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

       
        // Get response text first
        const responseText = await response.text()
        

        // Try to parse as JSON
        let result
        try {
            result = JSON.parse(responseText)
        } catch (e) {
            console.error(' Failed to parse response as JSON:', responseText)
            throw new Error(`Server returned invalid JSON. Status: ${response.status}, Response: ${responseText.substring(0, 100)}`)
        }

        if (!response.ok) {
            throw new Error(result.error || `HTTP error ${response.status}`)
        }

        if (result.success) {
            console.log(' Registration successful, attempting auto-login...')
            
            const loginResult = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            if (loginResult?.ok) {
                console.log(' Auto-login successful, redirecting...')
                router.push('/')
            } else {
                console.error(' Auto-login failed:', loginResult?.error)
                alert('Account created! Please sign in manually.')
                router.push('/features/Auth/login')
            }
        } else {
            alert(result.error || 'Registration failed')
        }
    } catch (error) {
        console.error(' Registration error:', error)
        alert(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
        setLoading(false)
    }
}
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-3 no-underline z-50 relative group">
                <div className="relative">
                  <div className="w-12 h-12 border border-[#94eca8] rounded-lg flex items-center justify-center bg-white group-hover:border-[#0B5D1E] transition-colors">
                    <div className="flex gap-1">
                      <div className="w-1 h-3 bg-[#05bb2f] rounded-full transform rotate-45 transition-transform group-hover:rotate-0"></div>
                      <div className="w-1 h-4 bg-[#dfb018] rounded-full transform -rotate-45 mt-1 transition-transform group-hover:rotate-0"></div>
                      <div className="w-1 h-3 bg-[#05bb2f] rounded-full transform rotate-45 transition-transform group-hover:rotate-0"></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-normal text-2xl text-[#1F2937] leading-tight tracking-normal">
                    Kazilink
                  </span>
                  <span className="text-[#6B7280] text-xs font-normal">kenya</span>
                </div>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/features/Jobs" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Find Jobs
              </Link>
              <Link 
                href="/features/Auth/login" 
                className="text-sm ring-1 ring-[#0B5D1E] text-green-500 px-4 py-2 rounded-lg hover:ring-[#05a82e] hover:text-gray-600 hover:bg-[#c7fad4] transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className={`w-full ${formData.accountType === 'employer' ? 'max-w-3xl' : 'max-w-2xl'}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/features/Auth/login" className="text-[#0bda3b] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* Social Registration */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FcGoogle size={20} />
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1877f2] text-white rounded-lg hover:bg-[#166fe5] transition-colors">
              <FaFacebook size={18} />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or register with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account Type Selection */}
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex items-center justify-center text-white gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.accountType === 'jobseeker' 
                  ? 'border-[#0B5D1E] bg-[#91ffab] hover:bg-[#4fff78]' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-100'
              }`}>
                <input
                  type="radio"
                  name="accountType"
                  value="jobseeker"
                  checked={formData.accountType === 'jobseeker'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <Briefcase size={18} className={formData.accountType === 'jobseeker' ? 'text-[#5a5a5a]' : 'text-gray-400'} />
                <span className={`text-sm font-medium ${
                  formData.accountType === 'jobseeker' ? 'text-[#5a5a5a]' : 'text-gray-600'
                }`}>Job Seeker</span>
              </label>
              <label className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.accountType === 'employer' 
                  ? 'border-[#0B5D1E] bg-[#91ffab] hover:bg-[#4fff78] ' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-100'
              }`}>
                <input
                  type="radio"
                  name="accountType"
                  value="employer"
                  checked={formData.accountType === 'employer'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <Building2 size={18} className={formData.accountType === 'employer' ? 'text-[#0B5D1E]' : 'text-gray-400'} />
                <span className={`text-sm font-medium ${
                  formData.accountType === 'employer' ? 'text-[#5a5a5a]' : 'text-gray-600'
                }`}>Employer</span>
              </label>
            </div>

            {/* Common Fields for Both */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className={formData.accountType === 'employer' ? 'md:col-span-1' : 'md:col-span-2'}>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                  {formData.accountType === 'employer' ? 'Contact person name' : 'Full name'} <span className="text-green-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                    placeholder={formData.accountType === 'employer' ? 'John Kamau' : 'John Kamau'}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address <span className="text-green-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone number <span className="text-green-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                    placeholder="0712 345 678"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password <span className="text-green-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm password <span className="text-green-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Job Seeker Specific Fields */}
            {formData.accountType === 'jobseeker' && (
              <div className="space-y-5 border-t border-gray-100 pt-5">
                <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
                
                {/* Skills */}
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Skills <span className="text-green-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="skills"
                      name="currentSkill"
                      type="text"
                      value={formData.currentSkill}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                      placeholder="e.g., React, JavaScript, Design"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2.5 bg-[#0fb636] text-white rounded-lg hover:bg-[#0a4c1a] transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  
                  {/* Skills List */}
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Years of experience <span className="text-green-500">*</span>
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-8">5-8 years</option>
                    <option value="8+">8+ years</option>
                  </select>
                </div>

                {/* Education */}
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Highest education <span className="text-green-500">*</span>
                  </label>
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select education</option>
                    <option value="certificate">Certificate</option>
                    <option value="diploma">Diploma</option>
                    <option value="degree">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="doctorate">Doctorate</option>
                  </select>
                </div>

                {/* Expected Salary & Job Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Expected salary (KES)
                    </label>
                    <input
                      id="expectedSalary"
                      name="expectedSalary"
                      type="text"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent"
                      placeholder="e.g., 50,000 - 80,000"
                    />
                  </div>
                  <div>
                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Preferred job type
                    </label>
                    <select
                      id="jobType"
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="fulltime">Full-time</option>
                      <option value="parttime">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="remote">Remote</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Preferred location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                      placeholder="e.g., Nairobi, Mombasa"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Employer Specific Fields */}
            {formData.accountType === 'employer' && (
              <div className="space-y-5 border-t border-gray-100 pt-5">
                <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
                
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company name <span className="text-green-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                      placeholder="e.g., Safaricom"
                      required
                    />
                  </div>
                </div>

                {/* Company Size & Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Company size <span className="text-green-500">*</span>
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Industry <span className="text-green-500">*</span>
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="construction">Construction</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Company Website */}
                <div>
                  <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="companyWebsite"
                      name="companyWebsite"
                      type="url"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                      placeholder="https://www.company.com"
                    />
                  </div>
                </div>

                {/* Company Location */}
                <div>
                  <label htmlFor="companyLocation" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company location <span className="text-green-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="companyLocation"
                      name="companyLocation"
                      type="text"
                      value={formData.companyLocation}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                      placeholder="e.g., Nairobi, Kenya"
                      required
                    />
                  </div>
                </div>

                {/* Company Description */}
                <div>
                  <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company description <span className="text-green-500">*</span>
                  </label>
                  <textarea
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent"
                    placeholder="Tell us about your company..."
                    required
                  />
                </div>

                {/* Contact Position */}
                <div>
                  <label htmlFor="contactPosition" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your position <span className="text-green-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Award size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="contactPosition"
                      name="contactPosition"
                      type="text"
                      value={formData.contactPosition}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] text-gray-500 focus:border-transparent transition-shadow"
                      placeholder="e.g., HR Manager, CEO"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 pt-3">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-[#10b937] focus:ring-[#0B5D1E]"
                required
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-[#0B5D1E] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#0B5D1E] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
           <button
    type="submit"
    disabled={loading}
    className="w-full ring-1 ring-[#0B5D1E] text-[#0ebe37] py-2.5 rounded-lg font-medium hover:ring-[#05a82e] hover:text-gray-500 hover:bg-[#c7fad4] transition-colors flex items-center justify-center gap-2 group mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
>
    {loading ? (
        <>
            <span>Creating account...</span>
            <div className="w-4 h-4 border-2 border-[#0B5D1E] border-t-transparent rounded-full animate-spin"></div>
        </>
    ) : (
        <>
            <span>Create account</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </>
    )}
</button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 kazi<span className="text-[#0B5D1E]">link</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RegisterPage