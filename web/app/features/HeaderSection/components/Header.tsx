'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll detection for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Expanded dropdown options (your existing arrays)
  const servicesDropdown = [
    { label: 'Business Financing', href: '#business-financing' },
    { label: 'Trade Finance', href: '#trade-finance' },
    { label: 'Asset Financing', href: '#asset-financing' },
    { label: 'Working Capital', href: '#working-capital' },
    { label: 'Invoice Discounting', href: '#invoice-discounting' },
    { label: 'Supply Chain Finance', href: '#supply-chain' },
    { label: 'Project Finance', href: '#project-finance' },
    { label: 'SME Loans', href: '#sme-loans' },
  ];

  const howItWorksDropdown = [
    { label: 'Application Process', href: '#application' },
    { label: 'Document Requirements', href: '#documents' },
    { label: 'Approval Timeline', href: '#timeline' },
    { label: 'Disbursement Process', href: '#disbursement' },
    { label: 'Repayment Options', href: '#repayment' },
    { label: 'Interest Rates', href: '#rates' },
    { label: 'Customer Support', href: '#support' },
    { label: 'FAQ', href: '#faq' },
  ];

  const trustDropdown = [
    { label: 'CBK Licensed', href: '#cbk' },
    { label: '15+ Years Experience', href: '#experience' },
    { label: '10,000+ Clients', href: '#clients' },
    { label: 'KES 2B+ Processed', href: '#volume' },
    { label: 'Award Winning', href: '#awards' },
    { label: 'Partner Banks', href: '#partners' },
    { label: 'Security Measures', href: '#security' },
    { label: 'Client Testimonials', href: '#testimonials' },
  ];

  const contactDropdown = [
    { label: 'Head Office', href: '#head-office' },
    { label: 'Regional Branches', href: '#branches' },
    { label: 'Support Hotline', href: 'tel:+254743861565' },
    { label: 'Email Support', href: 'mailto:support@kazilink.co.ke' },
    { label: 'Live Chat', href: '#chat' },
    { label: 'Schedule Meeting', href: '#meeting' },
    { label: 'Complaints Desk', href: '#complaints' },
    { label: 'Feedback Form', href: '#feedback' },
  ];

  return (
    <>
      <style jsx global>{`
        /* Fix for sticky header */
        html {
          scroll-padding-top: 80px; /* Adjust based on header height */
        }
        
        /* Dropdown styles */
        .dropdown-container {
          position: static;
        }
        
        .dropdown-menu {
          position: fixed; /* Changed from absolute to fixed */
          top: 80px; /* Header height */
          left: 0;
          right: 0;
          width: 100vw;
          background: #F9FAFB;
          border-top: 1px solid #E5E7EB;
          border-bottom: 1px solid #E5E7EB;
          padding: 40px 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-20px);
          transition: all 0.3s ease;
          z-index: 998;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }
        
        .dropdown-container:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .dropdown-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }
        
        .dropdown-column {
          display: flex;
          flex-direction: column;
        }
        
        .dropdown-column-title {
          font-size: 16px;
          font-weight: 600;
          color: #0B5D1E;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #C9A227;
        }
        
        .dropdown-item {
          padding: 12px 0;
          color: #1F2937;
          text-decoration: none;
          transition: all 0.2s;
          font-size: 15px;
          border-left: 2px solid transparent;
          padding-left: 12px;
        }
        
        .dropdown-item:hover {
          color: #0B5D1E;
          border-left-color: #C9A227;
          padding-left: 16px;
        }
        
        .dropdown-highlight {
          background: #FFFFFF;
          border-radius: 8px;
          padding: 24px;
          margin-top: 10px;
          border: 1px solid #E5E7EB;
        }
        
        .dropdown-highlight h4 {
          color: #0B5D1E;
          margin-bottom: 12px;
          font-size: 16px;
          font-weight: 600;
        }
        
        .dropdown-highlight p {
          color: #6B7280;
          font-size: 14px;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        
        .highlight-link {
          color: #C9A227;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        
        .highlight-link:hover {
          text-decoration: underline;
        }
        
        /* Header hover effects */
        .nav-link {
          position: relative;
          padding: 8px 0;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #C9A227;
          transition: width 0.3s ease;
        }
        
        .dropdown-container:hover .nav-link::after {
          width: 100%;
        }
        
        /* Mobile styles */
        @media (max-width: 768px) {
          .dropdown-menu {
            position: static;
            width: 100%;
            padding: 20px;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            border: none;
            max-height: none;
          }
          
          .dropdown-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .mobile-dropdown-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 16px;
            background: none;
            border: none;
            text-align: left;
            font-size: 16px;
            font-weight: 500;
            color: #1F2937;
            border-bottom: 1px solid #E5E7EB;
          }
        }
      `}</style>

      <header className={`sticky top-0 z-[100] bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : 'shadw-sm'
      } borer-b borer-[#E5E7EB]`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {/* Services Dropdown */}
              <div className="dropdown-container">
                <button 
                  className="nav-link flex items-center gap-1 text-[#1F2937] hover:text-[#0B5D1E] transition-colors font-medium text-base"
                  onMouseEnter={() => setActiveDropdown('services')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  Services
                </button>
                <div className="dropdown-menu">
                  <div className="dropdown-grid">
                    <div className="dropdown-column">
                      <h3 className="dropdown-column-title">Business Financing</h3>
                      {servicesDropdown.slice(0, 4).map((item, index) => (
                        <a key={index} href={item.href} className="dropdown-item">
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="dropdown-column">
                      <h3 className="dropdown-column-title">Specialized Finance</h3>
                      {servicesDropdown.slice(4, 8).map((item, index) => (
                        <a key={index} href={item.href} className="dropdown-item">
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="dropdown-column">
                      <div className="dropdown-highlight">
                        <h4>Fast Approval</h4>
                        <p>Get approved for business loans in as little as 48 hours with our streamlined process.</p>
                        <a href="#apply" className="highlight-link">
                          Apply Now →
                        </a>
                      </div>
                    </div>
                    <div className="dropdown-column">
                      <div className="dropdown-highlight">
                        <h4>Flexible Terms</h4>
                        <p>Customizable repayment schedules tailored to your business cash flow.</p>
                        <a href="#calculator" className="highlight-link">
                          Use Loan Calculator →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How It Works Dropdown */}
              <div className="dropdown-container">
                <button 
                  className="nav-link flex items-center gap-1 text-[#1F2937] hover:text-[#0B5D1E] transition-colors font-medium text-base"
                  onMouseEnter={() => setActiveDropdown('how-it-works')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  How It Works
                </button>
                <div className="dropdown-menu">
                  <div className="dropdown-grid">
                    <div className="dropdown-column">
                      <h3 className="dropdown-column-title">Application Process</h3>
                      {howItWorksDropdown.slice(0, 4).map((item, index) => (
                        <a key={index} href={item.href} className="dropdown-item">
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="dropdown-column">
                      <h3 className="dropdown-column-title">Terms & Support</h3>
                      {howItWorksDropdown.slice(4, 8).map((item, index) => (
                        <a key={index} href={item.href} className="dropdown-item">
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="dropdown-column">
                      <div className="dropdown-highlight">
                        <h4>Quick Start Guide</h4>
                        <p>Complete our 5-minute application and get pre-approved instantly.</p>
                        <a href="#quick-start" className="highlight-link">
                          Start Application →
                        </a>
                      </div>
                    </div>
                    <div className="dropdown-column">
                      <div className="dropdown-highlight">
                        <h4>Document Checklist</h4>
                        <p>Everything you need to prepare for a smooth application process.</p>
                        <a href="#checklist" className="highlight-link">
                          Download Checklist →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Trust Us Dropdown */}
              <div className="dropdown-container">
                <button 
                  className="nav-link flex items-center gap-1 text-[#1F2937] hover:text-[#0B5D1E] transition-colors font-medium text-base"
                  onMouseEnter={() => setActiveDropdown('trust')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  Why Trust Us
                </button>
                <div className="dropdown-menu">
                  <div className="dropdown-grid">
                    <div className="dropdown-column">
                      <h3 className="dropdown-column-title">Credentials</h3>
                      {trustDropdown.slice(0, 4).map((item, index) => (
                        <a key={index} href={item.href} className="dropdown-item">
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="dropdown-column">
                      <h3 className="dropdown-column-title">Recognition</h3>
                      {trustDropdown.slice(4, 8).map((item, index) => (
                        <a key={index} href={item.href} className="dropdown-item">
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="dropdown-column">
                      <div className="dropdown-highlight">
                        <h4>Industry Awards</h4>
                        <p>Recognized as Best SME Finance Provider 2023 by Kenya Bankers Association.</p>
                        <a href="#awards" className="highlight-link">
                          View Awards →
                        </a>
                      </div>
                    </div>
                    <div className="dropdown-column">
                      <div className="dropdown-highlight">
                        <h4>Client Success</h4>
                        <p>98% client satisfaction rate with over 500 5-star reviews.</p>
                        <a href="#reviews" className="highlight-link">
                          Read Reviews →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Dropdown */}
              <div className="dropdown-container">
                <button 
                  className="nav-link flex items-center gap-1 text-[#1F2937] hover:text-[#0B5D1E] transition-colors font-medium text-base"
                  onMouseEnter={() => setActiveDropdown('contact')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  Contact
                </button>
                <div className="dropdown-menu">
                  <div className="dropdown-grid">
                    <div className="dropdown-column">
                      <h3 className="dropdown-column-title">Locations</h3>
                      {contactDropdown.slice(0, 4).map((item, index) => (
                        <a key={index} href={item.href} className="dropdown-item">
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="dropdown-column">
                      <h3 className="dropdown-column-title">Support Channels</h3>
                      {contactDropdown.slice(4, 8).map((item, index) => (
                        <a key={index} href={item.href} className="dropdown-item">
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="dropdown-column">
                      <div className="dropdown-highlight">
                        <h4>24/7 Support</h4>
                        <p>Our customer service team is available round the clock to assist you.</p>
                        <a href="tel:+254743861565" className="highlight-link">
                          Call Now: +254 743 861 565
                        </a>
                      </div>
                    </div>
                    <div className="dropdown-column">
                      <div className="dropdown-highlight">
                        <h4>Visit Us</h4>
                        <p>Schedule a meeting with our financial advisors at your convenience.</p>
                        <a href="#booking" className="highlight-link">
                          Book Appointment →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Number & CTA */}
              <div className="flex items-center gap-6 ml-4 pl-6 border-l border-[#E5E7EB]">
                <a 
                  href="tel:+254743861565" 
                  className="flex items-center gap-2 text-[#0B5D1E] hover:text-[#C9A227] transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#0B5D1E]/10 rounded-full flex items-center justify-center group-hover:bg-[#C9A227]/20 transition-colors">
                    <Phone size={18} className="text-[#0B5D1E]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Call Us</span>
                    <span className="text-sm font-semibold">+254 743 861 565</span>
                  </div>
                </a>
                
                <a 
                  href="/features/Auth/register" 
                  className="ring-1 ring-[#00d832]  text-[#00d832] px-6 py-3 rounded-lg font-medium hover:bg-[#59f193] hover:text-white transition-all shadow-md hover:shadow-lg"
                >
                  Get Started
                </a>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#0B5D1E] bg-[#0B5D1E]/10 p-2 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-[#E5E7EB]">
              <div className="py-4">
                {/* Services Mobile Dropdown */}
                <button 
                  className="mobile-dropdown-toggle"
                  onClick={() => setActiveDropdown(activeDropdown === 'services-mobile' ? null : 'services-mobile')}
                >
                  <span>Services</span>
                  <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'services-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'services-mobile' && (
                  <div className="dropdown-menu">
                    <div className="dropdown-grid">
                      <div className="dropdown-column">
                        <h3 className="dropdown-column-title">Business Financing</h3>
                        {servicesDropdown.map((item, index) => (
                          <a key={index} href={item.href} className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* How It Works Mobile Dropdown */}
                <button 
                  className="mobile-dropdown-toggle"
                  onClick={() => setActiveDropdown(activeDropdown === 'how-mobile' ? null : 'how-mobile')}
                >
                  <span>How It Works</span>
                  <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'how-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'how-mobile' && (
                  <div className="dropdown-menu">
                    <div className="dropdown-grid">
                      <div className="dropdown-column">
                        <h3 className="dropdown-column-title">Process & Support</h3>
                        {howItWorksDropdown.map((item, index) => (
                          <a key={index} href={item.href} className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Why Trust Us Mobile Dropdown */}
                <button 
                  className="mobile-dropdown-toggle"
                  onClick={() => setActiveDropdown(activeDropdown === 'trust-mobile' ? null : 'trust-mobile')}
                >
                  <span>Why Trust Us</span>
                  <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'trust-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'trust-mobile' && (
                  <div className="dropdown-menu">
                    <div className="dropdown-grid">
                      <div className="dropdown-column">
                        <h3 className="dropdown-column-title">Our Credentials</h3>
                        {trustDropdown.map((item, index) => (
                          <a key={index} href={item.href} className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Mobile Dropdown */}
                <button 
                  className="mobile-dropdown-toggle"
                  onClick={() => setActiveDropdown(activeDropdown === 'contact-mobile' ? null : 'contact-mobile')}
                >
                  <span>Contact</span>
                  <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'contact-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'contact-mobile' && (
                  <div className="dropdown-menu">
                    <div className="dropdown-grid">
                      <div className="dropdown-column">
                        <h3 className="dropdown-column-title">Get in Touch</h3>
                        {contactDropdown.map((item, index) => (
                          <a key={index} href={item.href} className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Contact Info */}
                <div className="mt-6 pt-6 border-t border-[#E5E7EB] px-4">
                  <a 
                    href="tel:+254743861565" 
                    className="flex items-center gap-3 text-[#0B5D1E] mb-4 p-3 bg-[#0B5D1E]/5 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-10 h-10 bg-[#0B5D1E] rounded-full flex items-center justify-center">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Call Now</span>
                      <span className="text-lg font-semibold">+254 743 861 565</span>
                    </div>
                  </a>
                  
                  <a 
                    href="#contact" 
                    className="block w-full bg-[#0B5D1E] text-white py-4 rounded-lg font-medium hover:bg-[#C9A227] hover:text-[#0B5D1E] transition-all text-center shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Free Consultation
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}