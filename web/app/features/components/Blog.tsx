"user client"
import React from 'react';
import { Building, Users, Upload, Briefcase, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PiMapPin } from "react-icons/pi";


const Blog = () => {

  const router = useRouter()
  // Current job openings - real data
  const currentJobs = [
    { role: 'Software Developer', company: 'Safaricom', location: 'Nairobi', type: 'Full-time', posted: '2 days ago' },
    { role: 'Marketing Lead', company: 'KCB Group', location: 'Nairobi', type: 'Full-time', posted: '1 day ago' },
    { role: 'Sales Manager', company: 'Equity Bank', location: 'Mombasa', type: 'Full-time', posted: '3 days ago' },
    { role: 'Data Analyst', company: 'Nation Media', location: 'Nairobi', type: 'Contract', posted: 'Today' }
  ];

  // Recent hires - realistic stories
  const recentHires = [
    { name: 'James M.', position: 'Senior Developer', company: 'Safaricom', found: '2 weeks' },
    { name: 'Sarah K.', position: 'Marketing Director', company: 'KCB Group', found: '10 days' },
    { name: 'Michael W.', position: 'Finance Manager', company: 'Equity Bank', found: '3 weeks' },
    { name: 'Grace N.', position: 'HR Specialist', company: 'Nation Media', found: '1 week' }
  ];

  // Platform statistics
  const platformStats = [
    { number: '12,800+', label: 'Active Jobs' },
    { number: '45,000+', label: 'People Hired' },
    { number: '2,500+', label: 'Companies' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      
      {/* Simple Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
          Find Talent or Find Work
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A platform built for both employers and job seekers in Kenya
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
  {/* Employers Section */}
  <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
        <Building className="text-emerald-600" size={24} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900">For Employers</h3>
        <p className="text-sm text-gray-500">Find your next great hire</p>
      </div>
    </div>

    <p className="text-gray-600 mb-6 text-base leading-relaxed">
      Post jobs and connect with qualified candidates from Kenya's largest professional network. 
      Our platform makes hiring simple and effective.
    </p>

    <div className="space-y-4 mb-8">
      {[
        "Post jobs for free",
        "Browse candidate profiles",
        "Direct messaging with applicants",
        "Applicant tracking system"
      ].map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
            <CheckCircle className="text-emerald-600" size={14} />
          </div>
          <span className="text-sm text-gray-700">{feature}</span>
        </div>
      ))}
    </div>

    <button 
      onClick={() => router.push("/features/ApplyJobs")} 
      className="w-full bg-emerald-600 text-white py-3.5 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-200 shadow-sm hover:shadow"
    >
      Apply for Job - Free
    </button>

    {/* Current Openings */}
    <div className="mt-10 pt-8 border-t border-gray-100">
      <h4 className="font-semibold text-gray-900 mb-4">Featured openings</h4>
      <div className="space-y-3">
        {currentJobs.slice(0, 2).map((job, index) => (
          <div 
            key={index} 
            className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium text-gray-900">{job.role}</div>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                {job.type}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">{job.company}</div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center text-gray-500">
                <PiMapPin size={12} className="mr-1" />
                {job.location}
              </span>
              <span className="text-gray-400">{job.posted}</span>
            </div>
          </div>
        ))}
      </div>
      {currentJobs.length > 2 && (
        <button className="w-full mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View all openings →
        </button>
      )}
    </div>
  </div>

  {/* Job Seekers Section */}
  <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
        <Users className="text-emerald-600" size={24} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900">For Job Seekers</h3>
        <p className="text-sm text-gray-500">Discover your next opportunity</p>
      </div>
    </div>

    <p className="text-gray-600 mb-6 text-base leading-relaxed">
      Browse thousands of jobs from Kenya's top employers. Create your profile and apply with a single click.
    </p>

    <div className="space-y-4 mb-8">
      {[
        "Create a professional profile for free",
        "Apply to jobs with one click",
        "Receive personalized job alerts",
        "Connect directly with employers"
      ].map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
            <CheckCircle className="text-emerald-600" size={14} />
          </div>
          <span className="text-sm text-gray-700">{feature}</span>
        </div>
      ))}
    </div>

    <button 
      onClick={() => router.push("/features/Jobs")} 
      className="w-full bg-white text-emerald-600 py-3.5 px-4 rounded-xl font-medium border-2 border-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
    >
      Browse Jobs & Businesses
    </button>

    {/* Recent Success Stories */}
    <div className="mt-10 pt-8 border-t border-gray-100">
      <h4 className="font-semibold text-gray-900 mb-4">Recently hired</h4>
      <div className="space-y-3">
        {recentHires.slice(0, 2).map((person, index) => (
          <div 
            key={index} 
            className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors"
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-medium text-emerald-700">
                {person.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{person.name}</div>
              <div className="text-sm text-gray-500">{person.position}</div>
            </div>
            <div className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
              {person.found}
            </div>
          </div>
        ))}
      </div>
      {recentHires.length > 2 && (
        <button className="w-full mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          See more success stories →
        </button>
      )}
    </div>
  </div>
</div>

      {/* Platform Stats */}
      <div className="mb-16">
        <div className="border border-gray-200 rounded-xl p-8 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Our Platform in Numbers</h3>
          <div className="grid grid-cols-3 gap-4">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Feedback */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-gray-900 mb-6">What people are saying</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full  mr-4">
                <img src="/joe.jpeg" className='rounded-full w-full h-full object-cover'/>
              </div>
              <div>
                <div className="font-medium text-gray-900">David O.</div>
                <div className="text-sm text-gray-600">Product Manager</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              "Found my current role through this platform. The process was straightforward and I started receiving interview invites within days."
            </p>
            <div className="text-xs text-gray-500">Hired in March 2025</div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full mr-4">
                 <img src="/lady.jpeg" className='rounded-full w-full h-full object-cover'/>
                 
              </div>
              <div>
                <div className="font-medium text-gray-900">Linda W.</div>
                <div className="text-sm text-gray-600">HR Manager</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              "We've hired 5 team members through this platform. The candidate quality is good and the interface is easy to use for hiring managers."
            </p>
            <div className="text-xs text-gray-500">Active user since 2026</div>
          </div>
        </div>
      </div>

      {/* Partner Agencies */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-6">Our Recruitment Partners</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="font-medium text-gray-900 mb-3">Executive Search Partners</div>
            <p className="text-gray-600 text-sm mb-4">
              Specialized recruitment for senior leadership positions across various industries.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Working together since:</span>
                <span className="font-medium text-gray-800">2020</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Placements completed:</span>
                <span className="font-medium text-gray-800">180+</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="font-medium text-gray-900 mb-3">Tech Recruitment</div>
            <p className="text-gray-600 text-sm mb-4">
              Focused on IT, engineering, and technical roles for Kenya's growing tech sector.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Working together since:</span>
                <span className="font-medium text-gray-800">2021</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Placements completed:</span>
                <span className="font-medium text-gray-800">250+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;