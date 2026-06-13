"use client"
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Building, Users, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  const [randomOpenings, setRandomOpenings] = useState<number[]>([]);

  const popularSearches = [
    'Software Engineer', 'Marketing Manager', 'Sales Executive', 
    'Accountant', 'Customer Service', 'Data Analyst', 
    'Project Manager', 'HR Manager', 'Nurse', 'Teacher'
  ];

  const featuredCompanies = [
    'Safaricom', 'KCB Group', 'Equity Bank', 'Co-operative Bank',
    'Nation Media', 'East African Breweries', 'Bamburi Cement'
  ];

  // Generate random openings only on client side
  useEffect(() => {
    setRandomOpenings(popularSearches.map(() => Math.floor(Math.random() * 200) + 50));
  }, []);

  return (
    <div className="min-h-[85vh] bg-gradient from-white to-gray-50 px-4 md:px-8 lg:px-16 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 ring-1 ring-[#00d832] text-[#00d832] px-4 py-2 rounded-full mb-6">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">12,800+ Jobs Available</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Find Your Next Career{' '}
            <span className="relative">
              Opportunity
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#C9A227]/20 -rotate-1"></span>
            </span>
            <br />
            <span className="text-emerald-600">in Kenya</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified employers and discover meaningful work opportunities 
            across Kenya's growing industries.
          </p>
        </div>

        {/* Main Search Container */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl p-6 border border-gray-100">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {/* Job Title Search */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Job title, keywords, or skills"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B5D1E]/20 focus:border-[#0B5D1E] text-gray-800 placeholder-gray-500"
                />
              </div>
              
              {/* Location Selector */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <MapPin className="text-gray-400" size={20} />
                </div>
                <select 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B5D1E]/20 focus:border-[#0B5D1E] text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">All Locations</option>
                  <option value="nairobi">Nairobi</option>
                  <option value="mombasa">Mombasa</option>
                  <option value="kisumu">Kisumu</option>
                  <option value="nakuru">Nakuru</option>
                  <option value="eldoret">Eldoret</option>
                  <option value="remote">Remote</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Search Button */}
              <button className="ring-1 ring-[#0B5D1E] text-gray-800 font-medium rounded-xl hover:bg-[#C9A227] hover:text-[#0B5D1E] transition-all duration-300 shadow-md hover:shadow-lg py-4 px-8 flex items-center justify-center gap-2">
                <Search size={20} />
                Search Jobs
              </button>
            </div>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-gray-500 font-medium">Quick filters:</span>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#0B5D1E] hover:text-white transition-colors">
                Full-time
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#0B5D1E] hover:text-white transition-colors">
                Remote
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#0B5D1E] hover:text-white transition-colors">
                Part-time
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#0B5D1E] hover:text-white transition-colors">
                Entry Level
              </button>
            </div>
          </div>
        </div>

        {/* Trending Searches with Visual Impact */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 ring-1 ring-[#00d832] to-[#C9A227] rounded-lg flex items-center justify-center">
                <TrendingUp className="text-[#00d832]" size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Trending in Kenya Now</h3>
                <p className="text-gray-500 text-sm">Most sought-after positions this week</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Updated <span className="text-[#01d432] font-medium">just now</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {popularSearches.slice(0, 10).map((search, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white border border-gray-200 rounded-xl p-4 hover:border-[#0B5D1E] hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-transparent via-[#0B5D1E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-sm font-medium text-gray-800 group-hover:text-[#0B5D1E]">{search}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {randomOpenings[index] || 0} openings
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Stats Dashboard */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-[#0B5D1E]/5 to-transparent rounded-2xl p-8 border border-gray-200/50">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">12.8k</div>
                <div className="text-gray-600 font-medium">Live Job Listings</div>
                <div className="text-xs text-[#01d432] mt-1 flex items-center justify-center gap-1">
                  <span>▲ 240 today</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">2.5k+</div>
                <div className="text-gray-600 font-medium">Verified Companies</div>
                <div className="text-xs text-[#01d432] mt-1 flex items-center justify-center gap-1">
                  <span>▲ 12 new this week</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">45k+</div>
                <div className="text-gray-600 font-medium">Professionals Hired</div>
                <div className="text-xs text-[#01d432] mt-1 flex items-center justify-center gap-1">
                  <span>▲ 1.2k this month</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
                <div className="text-gray-600 font-medium">Satisfaction Rate</div>
                <div className="text-xs text-[#01d432] mt-1 flex items-center justify-center gap-1">
                  <span>Based on 5k+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Companies Marquee */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Industry Leaders</h3>
            <p className="text-gray-600">Join thousands who found their dream career with us</p>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {[...featuredCompanies, ...featuredCompanies].map((company, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-xl hover:border-[#0B5D1E] hover:shadow-md transition-all duration-300 min-w-[180px]"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#0B5D1E]/20 to-[#C9A227]/20 rounded-lg"></div>
                  <span className="font-medium text-gray-800">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Add this to your CSS file or use a global stylesheet */}
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default HeroSection;