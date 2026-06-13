'use client';

import React from 'react'
import Header from './features/HeaderSection/components/Header'
import HeroSection from './features/HeroSection/HeroSection'
import Blog from './features/components/Blog';
import Footer from './features/components/Footer';


const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-0"> {/* Ensure content starts below header */}
        <HeroSection />
        
        <Blog/>
      
       
      </div>
        <Footer/>
    </div>
  )
}

export default Page