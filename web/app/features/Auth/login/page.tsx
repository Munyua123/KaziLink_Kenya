'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Lock, Eye, EyeOff, Facebook } from 'lucide-react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react' 

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(false)  
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   
   try {
    setLoading(true)
     const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      alert('Invalid credebtials')
    }else {
      router.push("/")
    }
   } catch (error) {
     console.error('Login error:', error)
          alert('An error occurred during login')
   } finally {
    setLoading(false)
   }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Simple Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
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
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/features/Jobs" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Find Jobs
              </Link>
              <Link 
                href="/features/Auth/register" 
                className="text-sm ring-1 ring-[#0B5D1E] text-green-500 px-4 py-2 rounded-lg hover:ring-[#05a82e] hover:text-gray-600 hover:bg-[#c7fad4] transition-colors"
              >
                Sign Up
              </Link>
                </div>
            </div>
            </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/features/Auth/register" className="text-[#0ebe37] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FcGoogle  size={18} className="text-gray-700" />
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
              <span className="px-4 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e] focus:border-transparent transition-shadow"
                  placeholder="kazilink@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[#0ebe37] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00c42e]  focus:border-transparent transition-shadow"
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
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0B5D1E] focus:ring-[#0B5D1E]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full ring-1 ring-[#0B5D1E] text-[#0ebe37] py-2.5 rounded-lg font-medium hover:ring-[#05a82e] hover:text-gray-500 hover:bg-[#c7fad4] transition-colors flex items-center justify-center gap-2 group"
            >
              <span>Sign in</span>
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-400 text-center mt-6">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-gray-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-gray-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 kazi<span className="text-[#0ebe37]">link</span>. All rights reserved.
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

export default LoginPage