import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Globe,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Browse Jobs', href: '/jobs' },
    { name: 'Browse Companies', href: '/companies' },
    { name: 'Post a Job', href: '/post-job' },
    { name: 'Career Resources', href: '/resources' },
    { name: 'Success Stories', href: '/stories' }
  ];

  const employerLinks = [
    { name: 'Hire Talent', href: '/employers' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Employer Resources', href: '/employer-resources' },
    { name: 'Recruitment Solutions', href: '/recruitment' }
  ];

  const candidateLinks = [
    { name: 'Create Profile', href: '/profile' },
    { name: 'Upload CV', href: '/upload-cv' },
    { name: 'Job Alerts', href: '/alerts' },
    { name: 'Career Advice', href: '/advice' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  const popularCities = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Nyeri', 'Kitale'
  ];

  const popularCategories = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Sales', 'Engineering', 'Administration'
  ];

  return (
    <footer className="bg-black text-gray-500">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <a href="#" className="flex items-center gap-3 no-underline z-50 relative group">
              <div className="relative">
                <div className="w-12 h-12 border border-[#E5E7EB] rounded-lg flex items-center justify-center bg-white group-hover:border-[#0B5D1E] transition-colors">
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-[#0B5D1E] rounded-full transform rotate-45 transition-transform group-hover:rotate-0"></div>
                    <div className="w-1 h-4 bg-[#C9A227] rounded-full transform -rotate-45 mt-1 transition-transform group-hover:rotate-0"></div>
                    <div className="w-1 h-3 bg-[#0B5D1E] rounded-full transform rotate-45 transition-transform group-hover:rotate-0"></div>
                  </div>
                </div>
              </div>
             
            </a>
              <div>
                <h3 className="text-xl font-bold text-white">KaziLink</h3>
                <p className="text-sm text-gray-400">Connecting Talent with Opportunity</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Kenya's trusted platform connecting skilled professionals with leading employers across all industries. 
              Real people, real opportunities.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#0B5D1E]" />
                <span className="text-gray-400">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#0B5D1E]" />
                <span className="text-gray-400">+254 743861565</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#0B5D1E]" />
                <span className="text-gray-400">Kazilink@gmail.co.ke</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">For Employers</h4>
            <ul className="space-y-3">
              {employerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Candidates */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">For Job Seekers</h4>
            <ul className="space-y-3">
              {candidateLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Searches Section */}
      {/*   <div className="mb-12">
          <h4 className="text-white font-semibold mb-6 text-lg">Popular Searches</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {popularCities.map((city, index) => (
              <a 
                key={index} 
                href={`/jobs?location=${city.toLowerCase()}`}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-center text-sm text-gray-300 hover:text-white transition-colors"
              >
                Jobs in {city}
              </a>
            ))}
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {popularCategories.map((category, index) => (
              <a 
                key={index} 
                href={`/jobs?category=${category.toLowerCase()}`}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-center text-sm text-gray-300 hover:text-white transition-colors"
              >
                {category} Jobs
              </a>
            ))}
          </div>
        </div>
 */}
        {/* Company Links */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-6">
            {companyLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Social Media & Language */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-800 pt-8">
          <div className="flex items-center gap-6">
            {/* Social Media */}
            <div className="flex gap-4">
              <a href="https://facebook.com" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center">
                <Facebook size={18} className="text-gray-300" />
              </a>
              <a href="https://twitter.com" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center">
                <Twitter size={18} className="text-gray-300" />
              </a>
              <a href="https://linkedin.com" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center">
                <Linkedin size={18} className="text-gray-300" />
              </a>
              <a href="https://instagram.com" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center">
                <Instagram size={18} className="text-gray-300" />
              </a>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-gray-400" />
              <select className="bg-transparent text-gray-300 text-sm focus:outline-none">
                <option value="en">English</option>
                <option value="sw">Swahili</option>
              </select>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="flex-1 max-w-md">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email for job alerts"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0B5D1E] text-sm"
              />
              <button className="px-6 py-2 bg-[#0B5D1E] text-white rounded-lg font-medium hover:bg-[#0B5D1E]/90 transition-colors text-sm">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Get notified about new job opportunities</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {currentYear} KaziLink. All rights reserved.
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 text-sm">
             {/*  <span>Made with</span> */}
              <Heart size={14} className="text-red-500 fill-current" />
             {/*  <span>in Kenya</span> */}
            </div>
            
            <div className="text-gray-500 text-sm">
              Helping {new Intl.NumberFormat().format(45000)}+ professionals find work
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;