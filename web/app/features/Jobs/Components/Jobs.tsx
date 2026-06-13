import React from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Filter, 
  Heart, 
  Share2,
  Building,
  CheckCircle,
  Users,
  TrendingUp,
  Star
} from 'lucide-react';

const Jobs = () => {
  // Job categories
  const jobCategories = [
    { name: 'Technology', icon: '💻', count: '1,240' },
    { name: 'Healthcare', icon: '🏥', count: '890' },
    { name: 'Finance', icon: '💰', count: '1,560' },
    { name: 'Education', icon: '📚', count: '740' },
    { name: 'Marketing', icon: '📈', count: '680' },
    { name: 'Sales', icon: '🤝', count: '920' },
    { name: 'Engineering', icon: '⚙️', count: '1,100' },
    { name: 'Administration', icon: '', count: '550' }
  ];

  // Featured jobs data
  const featuredJobs = [
    {
      id: 1,
      title: 'Senior Software Developer',
      company: 'Safaricom PLC',
      logo: '🟢',
      location: 'Nairobi',
      type: 'Full-time',
      salary: 'KSh 250,000 - 350,000',
      posted: '2 days ago',
      urgent: true,
      verified: true,
      description: 'Looking for experienced developers to join our digital transformation team.'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      company: 'KCB Group',
      logo: '🔵',
      location: 'Nairobi',
      type: 'Full-time',
      salary: 'KSh 200,000 - 280,000',
      posted: '1 day ago',
      urgent: true,
      verified: true,
      description: 'Lead marketing initiatives for East Africa\'s largest banking group.'
    },
    {
      id: 3,
      title: 'Customer Service Lead',
      company: 'Equity Bank',
      logo: '🟣',
      location: 'Mombasa',
      type: 'Full-time',
      salary: 'KSh 120,000 - 180,000',
      posted: '3 days ago',
      urgent: false,
      verified: true,
      description: 'Manage customer service team for coastal region operations.'
    },
    {
      id: 4,
      title: 'Data Analyst',
      company: 'Nation Media Group',
      logo: '📰',
      location: 'Nairobi',
      type: 'Contract',
      salary: 'KSh 180,000 - 240,000',
      posted: 'Today',
      urgent: true,
      verified: true,
      description: 'Analyze media trends and audience data for strategic insights.'
    },
    {
      id: 5,
      title: 'HR Specialist',
      company: 'Co-operative Bank',
      logo: '🏦',
      location: 'Nairobi',
      type: 'Full-time',
      salary: 'KSh 150,000 - 220,000',
      posted: '4 days ago',
      urgent: false,
      verified: true,
      description: 'Join our human resources team in talent acquisition and development.'
    },
    {
      id: 6,
      title: 'Sales Executive',
      company: 'East African Breweries',
      logo: '🍺',
      location: 'Kisumu',
      type: 'Full-time',
      salary: 'KSh 90,000 + Commission',
      posted: '5 days ago',
      urgent: false,
      verified: true,
      description: 'Expand our market presence in the western region.'
    }
  ];

  // Popular locations
  const popularLocations = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Remote', 'Hybrid'
  ];

  // Job types
  const jobTypes = [
    'Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Temporary'
  ];

  // Recent searches
  const recentSearches = [
    'Software Engineer Nairobi',
    'Marketing Manager',
    'Accountant',
    'Project Manager',
    'Nurse',
    'Teacher'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-[#0B5D1E]/10 to-[#C9A227]/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Dream Job in Kenya
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Browse {new Intl.NumberFormat().format(12800)}+ verified job opportunities from trusted Kenyan employers
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Job Title */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Job title, skills, or company"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B5D1E]/20 focus:border-[#0B5D1E]"
                />
              </div>

              {/* Location */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <MapPin className="text-gray-400" size={20} />
                </div>
                <select className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B5D1E]/20 focus:border-[#0B5D1E] appearance-none">
                  <option value="">All Locations</option>
                  {popularLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Job Type */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Briefcase className="text-gray-400" size={20} />
                </div>
                <select className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B5D1E]/20 focus:border-[#0B5D1E] appearance-none">
                  <option value="">All Job Types</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <button className="bg-[#0B5D1E] text-white py-3 rounded-xl font-semibold hover:bg-[#0B5D1E]/90 transition-colors flex items-center justify-center gap-2">
                <Search size={20} />
                Search Jobs
              </button>
            </div>

            {/* Quick Filters */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-gray-600 text-sm">Quick filters:</span>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#0B5D1E] hover:text-white transition-colors text-sm">
                Entry Level
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#0B5D1E] hover:text-white transition-colors text-sm">
                Remote Work
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#0B5D1E] hover:text-white transition-colors text-sm">
                Urgent Hiring
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#0B5D1E] hover:text-white transition-colors text-sm">
                Verified Companies
              </button>
            </div>
          </div>

          {/* Recent Searches */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={18} className="text-gray-500" />
              <span className="text-gray-600 text-sm">Recent searches:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-[#0B5D1E] hover:text-[#0B5D1E] transition-colors text-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <Filter size={20} className="text-gray-500" />
              </div>

              {/* Job Categories */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Job Categories</h3>
                <div className="space-y-3">
                  {jobCategories.map((category, index) => (
                    <label key={index} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className="text-gray-700 group-hover:text-[#0B5D1E]">{category.name}</span>
                      </div>
                      <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                        {category.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Salary Range</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-3 rounded text-[#0B5D1E]" />
                    <span className="text-gray-700">Up to KSh 50,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-3 rounded text-[#0B5D1E]" />
                    <span className="text-gray-700">KSh 50,000 - 100,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-3 rounded text-[#0B5D1E]" />
                    <span className="text-gray-700">KSh 100,000 - 200,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-3 rounded text-[#0B5D1E]" />
                    <span className="text-gray-700">KSh 200,000+</span>
                  </label>
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Experience Level</h3>
                <div className="flex flex-wrap gap-2">
                  {['Entry', 'Intermediate', 'Senior', 'Executive'].map(level => (
                    <button
                      key={level}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#0B5D1E] hover:text-white transition-colors text-sm"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset & Apply Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-[#0B5D1E] text-white py-3 rounded-lg font-medium hover:bg-[#0B5D1E]/90 transition-colors">
                  Apply Filters
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Reset All
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Header Stats */}
            <div className="flex flex-wrap items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Job Opportunities</h2>
                <p className="text-gray-600">Showing {featuredJobs.length} of 12,800+ jobs</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp size={20} />
                  <span className="text-sm font-medium">240 new jobs today</span>
                </div>
                <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700">
                  <option>Most Relevant</option>
                  <option>Newest First</option>
                  <option>Salary: High to Low</option>
                  <option>Salary: Low to High</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {featuredJobs.map(job => (
                <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#0B5D1E] hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  {/* Urgent Badge */}
                  {job.urgent && (
                    <div className="bg-red-50 text-red-600 py-2 px-4 text-sm font-medium flex items-center gap-2">
                      <Clock size={16} />
                      <span>Urgent Hiring</span>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Job Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#0B5D1E]">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-medium text-gray-700">{job.company}</span>
                            {job.verified && (
                              <span className="flex items-center gap-1 text-green-600 text-sm">
                                <CheckCircle size={14} />
                                <span>Verified</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Heart size={20} />
                      </button>
                    </div>

                    {/* Job Description */}
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Job Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-gray-500" />
                        <span className="text-gray-700">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={18} className="text-gray-500" />
                        <span className="text-gray-700">{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={18} className="text-gray-500" />
                        <span className="text-gray-700">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-gray-500" />
                        <span className="text-gray-700">{job.posted}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button className="flex-1 bg-[#0B5D1E] text-white py-3 rounded-lg font-medium hover:bg-[#0B5D1E]/90 transition-colors">
                        Apply Now
                      </button>
                      <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:border-[#0B5D1E] hover:text-[#0B5D1E] transition-colors">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 border-2 border-[#0B5D1E] text-[#0B5D1E] font-medium rounded-xl hover:bg-[#0B5D1E] hover:text-white transition-colors">
                Load More Jobs
              </button>
            </div>

            {/* Why Choose Us Section */}
            <div className="mt-16 bg-gradient-to-r from-[#0B5D1E]/5 to-transparent rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Job Seekers Choose Us</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0B5D1E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-[#0B5D1E]" size={28} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verified Employers</h3>
                  <p className="text-gray-600 text-sm">All companies are manually verified by our team</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0B5D1E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-[#0B5D1E]" size={28} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personal Support</h3>
                  <p className="text-gray-600 text-sm">Get help from our career advisors</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0B5D1E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="text-[#0B5D1E]" size={28} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Direct Applications</h3>
                  <p className="text-gray-600 text-sm">Apply directly to employers, no middlemen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#0B5D1E] py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get Job Alerts Delivered to You</h2>
          <p className="text-gray-200 mb-8">Receive personalized job matches directly in your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-[#0B5D1E] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Subscribe for Alerts
            </button>
          </div>
          <p className="text-gray-300 text-sm mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default Jobs;