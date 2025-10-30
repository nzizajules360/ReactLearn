import React from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  HeartIcon,
  ArrowUpIcon
} from '@heroicons/react/24/solid';
import {Sprout , Send} from 'lucide-react';
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-900 text-white relative">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-lime-500 to-emerald-600 p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
      >
        <ArrowUpIcon className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform duration-300" />
      </button>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-100 to-emerald-100 rounded-xl flex items-center justify-center">
                <img src="/logo.svg" alt="EcoSwarm" className="w-6 h-6" />
              </div>
              <h3 className="text-lime-300 font-bold text-2xl">EcoSwarm</h3>
            </div>
            <p className="text-green-200 mb-6 leading-relaxed">
              Building a sustainable future through innovative technology. Join our mission to create positive environmental impact worldwide.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/nziza__202/" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-lime-300">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-green-200 hover:text-lime-300 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 text-lime-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-green-200 hover:text-lime-300 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 text-lime-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/features" className="text-green-200 hover:text-lime-300 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 text-lime-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-green-200 hover:text-lime-300 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 text-lime-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="text-green-200 hover:text-lime-300 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 text-lime-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Eco Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-lime-300">Eco Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="/carbon-calculator" className="text-green-200 hover:text-lime-300 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 text-lime-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Carbon Calculator
                </a>
              </li>
              <li>
                <a href="/sustainability-guides" className="text-green-200 hover:text-lime-300 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 text-lime-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Sustainability Guides
                </a>
              </li>
              <li>
                <a href="/eco-blog" className="text-green-200 hover:text-lime-300 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 text-lime-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Eco Blog
                </a>
              </li>
              <li>
                <a href="/case-studies" className="text-green-200 hover:text-lime-300 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 text-lime-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Case Studies
                </a>
              </li>
              <li>
                <a href="/free-trial" className="text-green-200 hover:text-lime-300 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 text-lime-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Start Free Trial
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-lime-300">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-green-200">
                <MapPinIcon className="w-5 h-5 text-lime-300 mt-1 flex-shrink-0" />
                <span>123 Green Street, Eco City, EC 94025</span>
              </li>
              <li className="flex items-center space-x-3 text-green-200 hover:text-lime-300 transition-colors">
                <PhoneIcon className="w-5 h-5 text-lime-300 flex-shrink-0" />
                <a href="tel:+1555123ECO4">+1 (555) 123-ECO4</a>
              </li>
              <li className="flex items-center space-x-3 text-green-200 hover:text-lime-300 transition-colors">
                <EnvelopeIcon className="w-5 h-5 text-lime-300 flex-shrink-0" />
                <a href="mailto:hello@ecoswarm.com">hello@ecoswarm.com</a>
              </li>
            </ul>

            {/* Eco Newsletter */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3 text-lime-300">Eco Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-lime-300/30 rounded-l-lg text-white placeholder-green-200 focus:outline-none focus:border-lime-400 transition-colors"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-lime-500 to-emerald-600 rounded-r-lg hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-green-200 text-xs mt-2">
                Get sustainability tips & eco-updates
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-green-200 text-sm text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start space-x-1">
                <span>&copy; 2025 EcoSwarm. All rights reserved.</span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">Made with</span>
                <HeartIcon className="w-4 h-4 text-lime-400 animate-pulse hidden sm:inline" />
                <span className="hidden sm:inline">for our planet</span>
              </p>
              <p className="text-xs text-green-300 mt-1">
                5% of all profits donated to environmental causes
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-green-200 hover:text-lime-300 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-green-200 hover:text-lime-300 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/sustainability" className="text-green-200 hover:text-lime-300 transition-colors duration-200">
                Sustainability Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;