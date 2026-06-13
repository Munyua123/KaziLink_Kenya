"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { GoArrowLeft, GoX } from 'react-icons/go'
import { CiLocationOn } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { VscVerified } from "react-icons/vsc";
import { MdLocalOffer } from "react-icons/md";




// Define types for your data
type GalleryImageType = {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  category: string | null;
  size: string | null;
  businessId: string;
  serviceId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type ServiceImage = {
  url: string;
  size: 'small' | 'medium' | 'large';
  category: string;
  id: number;
};

type BusinessType = {
  id: string;
  name: string;
  description: string;
  location: string;
  logo: string | null;
  category: string;
  contactPhone: string | null;
  contactEmail: string | null;
  website: string | null;
  rating: number | null;
  reviewCount: number | null;
  isVerified: boolean;
  isFeatured: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  owner?: {
    name: string | null;
    email: string;
  };
  services?: any[];
  galleryImages?: GalleryImageType[];
};

type RealServiceType = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration: string | null;
  businessId: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

const SingleAdvertPage = () => {
  const router = useRouter()
  const params = useParams()
  const [business, setBusiness] = useState<BusinessType | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedServiceImages, setSelectedServiceImages] = useState<GalleryImageType[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'mosaic' | 'grid' | 'masonry'>('mosaic')
  const [services, setServices] = useState<RealServiceType[]>([])
  const [allGalleryImages, setAllGalleryImages] = useState<GalleryImageType[]>([])

  // Fetch business data, services, and gallery images from API
  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!params?.id) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const businessId = params.id as string
       
        
        // Fetch business details
        const businessResponse = await fetch(`/api/Business/${businessId}`)
        if (!businessResponse.ok) {
          throw new Error('Failed to fetch business')
        }
        
        const businessData = await businessResponse.json()
       
        
        if (businessData.success && businessData.data) {
          setBusiness(businessData.data)
          
          // Fetch services for this business
          const servicesResponse = await fetch(`/api/Business/${businessId}/services`)
          if (servicesResponse.ok) {
            const servicesData = await servicesResponse.json()
            if (servicesData.success) {
              setServices(servicesData.data || [])
            } else {
              // If no services API, use category-based services
              setServices(generateServicesFromCategory(businessData.data.category))
            }
          } else {
            // Fallback: generate services from category
            setServices(generateServicesFromCategory(businessData.data.category))
          }
          
          // Fetch gallery images for this business
          const galleryResponse = await fetch(`/api/gallery/${businessId}`)
          if (galleryResponse.ok) {
            const galleryData = await galleryResponse.json()
            if (galleryData.success) {
              setAllGalleryImages(galleryData.data || [])
              console.log(`Loaded ${galleryData.data.length} real gallery images`)
            }
          }
        } else {
          console.error('Business not found with ID:', businessId)
        }
      } catch (error) {
        console.error(' Error fetching business data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBusinessData()
  }, [params?.id])

  // Generate services based on category (fallback)
  const generateServicesFromCategory = (category: string): RealServiceType[] => {
    const categoryServices: Record<string, string[]> = {
      'Photography': ['Wedding Photography', 'Portrait Shoots', 'Event Coverage', 'Product Photography'],
      'Design': ['Logo Design', 'UI/UX Design', 'Brand Identity', 'Print Design'],
      'Development': ['Web Development', 'Mobile Apps', 'E-commerce', 'API Development'],
      'Marketing': ['Social Media', 'SEO', 'Content Marketing', 'Email Campaigns'],
      'Writing': ['Content Writing', 'Copywriting', 'Technical Writing', 'Blog Posts'],
      'Consulting': ['Business Strategy', 'IT Consulting', 'Marketing Consulting', 'Financial Advice'],
      'Legal': ['Legal Advice', 'Contract Review', 'Business Registration', 'Compliance'],
      'Finance': ['Accounting', 'Tax Preparation', 'Financial Planning', 'Audit Services']
    }
    
    const serviceNames = categoryServices[category] || ['Service 1', 'Service 2', 'Service 3', 'Service 4']
    
    return serviceNames.map((name, index) => ({
      id: `service-${index}`,
      name: name,
      description: `${name} service`,
      price: null,
      duration: null,
      businessId: params?.id as string || '',
      category: category,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  }

  // Handle opening service popup - NOW WITH REAL IMAGES
  const handleServiceClick = (serviceName: string) => {
    console.log(" Service clicked:", serviceName);
    setSelectedService(serviceName)
    
    // Filter gallery images for this service
    const serviceImages = allGalleryImages.filter(image => 
      // Match by service name in category or description
      image.category?.toLowerCase().includes(serviceName.toLowerCase()) ||
      image.description?.toLowerCase().includes(serviceName.toLowerCase()) ||
      // Or show all images if no specific service images found
      allGalleryImages.length === 0
    )
    
    console.log(" Real images found for service:", serviceImages.length);
    
    // If no specific service images, show all gallery images
    if (serviceImages.length === 0 && allGalleryImages.length > 0) {
      setSelectedServiceImages(allGalleryImages)
      console.log(" Showing all gallery images instead");
    } else {
      setSelectedServiceImages(serviceImages)
    }
    
    setCurrentImageIndex(0)
    setViewMode('mosaic')
  }

  // Close popup
  const handleClosePopup = () => {
    setSelectedService(null)
    setSelectedServiceImages([])
    setCurrentImageIndex(0)
  }

  // Convert database size to our display size
  const getDisplaySize = (dbSize: string | null): 'small' | 'medium' | 'large' => {
    if (!dbSize) return 'medium';
    const sizeMap: Record<string, 'small' | 'medium' | 'large'> = {
      'small': 'small',
      'medium': 'medium',
      'large': 'large',
      'sm': 'small',
      'md': 'medium',
      'lg': 'large'
    };
    return sizeMap[dbSize.toLowerCase()] || 'medium';
  }

  // Render Mosaic Layout WITH REAL IMAGES
  const renderMosaicLayout = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 auto-rows-[minmax(150px,auto)]">
      {selectedServiceImages.map((image, index) => {
        const displaySize = getDisplaySize(image.size);
        
        // Determine size classes
        let sizeClass = '';
        let colSpan = '';
        let rowSpan = '';
        
        if (displaySize === 'large') {
          sizeClass = 'md:col-span-2 md:row-span-2';
          colSpan = 'col-span-2';
          rowSpan = 'row-span-2';
        } else if (displaySize === 'medium') {
          sizeClass = 'md:col-span-1 md:row-span-2';
          rowSpan = 'row-span-2';
        } else {
          sizeClass = 'md:col-span-1 md:row-span-1';
        }
        
        return (
          <div
            key={image.id}
            className={`relative overflow-hidden rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${sizeClass} ${colSpan} ${rowSpan}`}
            style={{
              minHeight: displaySize === 'large' ? '300px' : 
                         displaySize === 'medium' ? '250px' : '150px'
            }}
            onClick={() => window.open(image.url, '_blank')}
          >
            {/* REAL IMAGE Container */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundColor: '#4a5568' // Fallback color
              }}
            >
              {/* Image loading/fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/10 flex items-center justify-center">
                {image.title && (
                  <div className="text-center p-4 bg-black/60 rounded-lg">
                    <div className="text-2xl md:text-3xl text-white/90 mb-1">
                      {image.category || 'Gallery'}
                    </div>
                    <p className="text-white/70 text-sm md:text-base">
                      {image.title}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
              <div className="text-white">
                <h3 className="font-bold text-sm md:text-base mb-1">
                  {image.title || image.category || 'Gallery Image'}
                </h3>
                {image.description && (
                  <p className="text-xs text-gray-300 mb-2 truncate">{image.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {displaySize}
                  </span>
                  <span className="text-xs bg-green-500/80 px-2 py-1 rounded">
                    View Full
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  // Render Grid Layout WITH REAL IMAGES
  const renderGridLayout = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
      {selectedServiceImages.map((image, index) => (
        <div
          key={image.id}
          className="relative aspect-square overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
          onClick={() => window.open(image.url, '_blank')}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image.url})` }}
          >
            {/* Fallback content if image doesn't load */}
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-center p-2">
                <p className="text-white text-xs font-medium">{image.title || `Image ${index + 1}`}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  // Render Masonry Layout WITH REAL IMAGES
  const renderMasonryLayout = () => (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
      {selectedServiceImages.map((image, index) => {
        const displaySize = getDisplaySize(image.size);
        let heightClass = '';
        
        if (displaySize === 'large') {
          heightClass = 'h-72 md:h-96';
        } else if (displaySize === 'medium') {
          heightClass = 'h-56 md:h-72';
        } else {
          heightClass = 'h-48';
        }
        
        return (
          <div
            key={image.id}
            className={`relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 mb-3 md:mb-4 break-inside-avoid cursor-pointer group ${heightClass}`}
            onClick={() => window.open(image.url, '_blank')}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-bold text-sm">{image.title || image.category || 'Image'}</h3>
                  {image.description && (
                    <p className="text-xs text-gray-300 mt-1 truncate">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading business details...</div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-gray-800 mb-4">Business not found</div>
        <button
          onClick={() => router.push('/features/Jobs')}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Back to Marketplace
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/features/Jobs')}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <GoArrowLeft className="text-xl" />
              <span>Back to Marketplace</span>
            </button>
            
            <div className="text-2xl font-bold">
              <span className="text-green-600">Kazi</span>
              <span className="text-gray-800">Link</span>
            </div>
            
            <button 
              onClick={() => {
                if (business.contactPhone) {
                  window.location.href = `tel:${business.contactPhone}`
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Contact Business
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Business Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  {business.logo ? (
                    <img 
                      src={business.logo} 
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl text-gray-400">
                      {business.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800">Contact Information</h3>
                <div className="space-y-3">
                  {business.contactPhone && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-2xl"><FiPhone />
</span>
                      <span className="text-gray-700">{business.contactPhone}</span>
                    </div>
                  )}
                  {business.contactEmail && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-2xl"><TfiEmail /></span>
                      <span className="text-gray-700">{business.contactEmail}</span>
                    </div>
                  )}
                  {business.website && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-2xl"><CiGlobe /></span>
                      <a 
                        href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 underline"
                      >
                        {business.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-3xl"><CiLocationOn /></span>
                    <span className="text-gray-700">{business.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {business.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 border border-green-500 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {business.category}
                    </span>
                    {business.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{business.rating.toFixed(1)}</span>
                        <span className="text-gray-500">({business.reviewCount || 0} reviews)</span>
                      </div>
                    )}
                    {business.isVerified && (
                      <span className="px-2 py-1 border border-green-500 bg-gree-100 text-green-800 rounded-full text-xs font-medium">
                        <VscVerified className="inline mr-1 text-green-500 text-lg"  />
                       Verified
                      </span>
                    )}
                    {business.isFeatured && (
                      <span className="px-2 py-1 bg-yello-100 border text-yellow-800 rounded-full text-xs font-medium">
                       <MdLocalOffer className="inline mr-1 text-yellow-500 text-lg"/>

                       Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {business.description || "No detailed description available."}
              </p>
              
              {/* Services Section */}
              {services.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Offered</h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Click on any service to view portfolio with {allGalleryImages.length > 0 ? 'real' : 'sample'} images
                    {allGalleryImages.length > 0 && ` (${allGalleryImages.length} available)`}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceClick(service.name)}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-125 transition-transform"></div>
                        <div className="flex-1">
                          <span className="text-gray-700 font-medium group-hover:text-green-700 block">
                            {service.name}
                          </span>
                          {service.description && (
                            <span className="text-gray-500 text-xs block mt-1">
                              {service.description}
                            </span>
                          )}
                        </div>
                        <div className="ml-auto text-gray-400 group-hover:text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Stats */}
              {allGalleryImages.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">Gallery Portfolio</h3>
                      <p className="text-gray-600 text-sm">
                        {allGalleryImages.length} real images available in portfolio
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedService('All Gallery Images')
                        setSelectedServiceImages(allGalleryImages)
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      View All Images
                    </button>
                  </div>
                </div>
              )}

              {/* Business Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-4">Business Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-medium ${business.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                      {business.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="text-gray-800 font-medium">
                      {new Date(business.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="text-gray-800 font-medium">
                      {new Date(business.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="border border-gray-200 text-gray-700 rounded-lg hover:text-green-400 hover:border-green-400 hover:bg-green-50 transition-all duration-200 cursor-pointer p-8 text-center  mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Work with {business.name}?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact them today to discuss your project or get a free quote!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {business.contactPhone && (
              <button 
                onClick={() => window.location.href = `tel:${business.contactPhone}`}
                className="px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                Call Now: {business.contactPhone}
              </button>
            )}
            {business.contactEmail && (
              <button 
                onClick={() => window.location.href = `mailto:${business.contactEmail}`}
                className="px-8 py-3 bg-transparent border border-green-400 text-gray-700 hover:border-gray-200 hover:bg-white font-bold rounded-lg  transition-colors"
              >
                Send Email
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Image Gallery */}
      {selectedService && (
  <div className="fixed inset-0 backdrop-blur-lg bg-gray-900/95 z-50 overflow-y-auto">
    {/* Gallery Header - Green Accent */}
    <div className="sticky top-0 z-10 backdrop-blur-lg bg-gray-900/90 border-b border-green-600/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
  <div className="w-8 h-8  ring-1 ring-green-500 rounded-full flex items-center justify-center bg-green-600/20">
    <span className="text-sm font-medium text-green-400">
      {business.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .slice(0, 3)}
    </span>
  </div>
  <div>
    <h2 className="text-xl md:text-2xl font-semibold text-white">
      {selectedService} Portfolio
    </h2>
    <p className="text-green-400/80 text-sm mt-1">
      {business.name} • {selectedServiceImages.length} images
    </p>
  </div>
</div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Mode Selector - Green Theme */}
            <div className="flex bg-gray-800/80 rounded-lg p-1 border border-green-600/20">
              <button
                onClick={() => setViewMode('mosaic')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'mosaic' 
                    ? 'bg-green-600 text-white shadow-md shadow-green-600/30' 
                    : 'text-gray-300 hover:text-white hover:bg-green-600/20'
                }`}
              >
                Mosaic
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-green-600 text-white shadow-md shadow-green-600/30' 
                    : 'text-gray-300 hover:text-white hover:bg-green-600/20'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'masonry' 
                    ? 'bg-green-600 text-white shadow-md shadow-green-600/30' 
                    : 'text-gray-300 hover:text-white hover:bg-green-600/20'
                }`}
              >
                Masonry
              </button>
            </div>
            
            {/* Close Button with Green Hover */}
            <button
              onClick={handleClosePopup}
              className="text-gray-400 hover:text-green-400 p-2 hover:bg-green-600/10 rounded-lg transition-colors border border-transparent hover:border-green-600/30"
              aria-label="Close gallery"
            >
              <GoX className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Gallery Content */}
    <div className="p-6 mt-1 md:p-8">
      <div className="max-w-7xl mx-auto">
        {selectedServiceImages.length > 0 ? (
          <>
            {/* Gallery Grid */}
            <div className="mb-8">
              {viewMode === 'mosaic' && renderMosaicLayout()}
              {viewMode === 'grid' && renderGridLayout()}
              {viewMode === 'masonry' && renderMasonryLayout()}
            </div>
            
            {/* Image Count with Green Accent */}
            <div className="pt-8">
  <div className="flex justify-center">
    <div className="inline-flex items-center gap-4 text-green-400 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        <span>{selectedServiceImages.length} professional images</span>
      </div>
      <div className="w-px h-4 bg-green-600/30"></div>
      <span>Merket with Us!</span>
    </div>
  </div>
</div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-5xl mb-6 text-green-500/60">📷</div>
            <h3 className="text-xl font-medium text-white mb-3">
              Portfolio Coming Soon
            </h3>
            <p className="text-green-400/70 text-center max-w-md mb-6">
              Professional portfolio images are being curated. 
              Contact {business.name} for current samples.
            </p>
            {business.contactEmail && (
              <button
                onClick={() => window.location.href = `mailto:${business.contactEmail}`}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Request Portfolio
              </button>
            )}
          </div>
        )}
      </div>
    </div>

    {/* Gallery Footer - Green Action Bar */}
    <div className="sticky bottom-0 backdrop-blur-lg bg-gray-900/90 border-t border-green-600/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-green-400/70 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <p>
                Professional portfolio by {business.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {selectedServiceImages.length > 0 && (
              <button 
                onClick={() => window.open(selectedServiceImages[0].url, '_blank')}
                className="px-5 py-2.5 border border-green-600/40 text-green-400 rounded-lg hover:bg-green-600/10 hover:text-green-300 transition-colors text-sm font-medium"
              >
                View Full Size
              </button>
            )}
            
            <button 
              onClick={() => {
                if (business.contactEmail) {
                  window.location.href = `mailto:${business.contactEmail}?subject=Inquiry about ${selectedService}`
                }
              }}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-md shadow-green-600/20"
            >
              Contact for Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Fixed Contact Button for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg z-40">
        {business.contactPhone && (
          <button 
            onClick={() => window.location.href = `tel:${business.contactPhone}`}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Contact {business.name}
          </button>
        )}
      </div>
    </div>
  )
}

export default SingleAdvertPage