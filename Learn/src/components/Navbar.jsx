import React, { useState } from 'react';
import { UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <h2 className="text-amber-400 font-bold text-2xl tracking-tight">
                React App
              </h2>
            </a>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <a 
                href="/" 
                className="text-white hover:text-amber-300 transition-colors duration-200 text-lg font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className="text-white hover:text-amber-300 transition-colors duration-200 text-lg font-medium"
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className="text-white hover:text-amber-300 transition-colors duration-200 text-lg font-medium"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <UserCircleIcon className="w-8 h-8 text-white hover:text-amber-300 transition-colors duration-200 cursor-pointer" />
            <a href="/login">
              <button className="px-5 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-amber-400 hover:text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                Login
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-amber-300 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-8 h-8" />
              ) : (
                <Bars3Icon className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-3">
            <a 
              href="/" 
              className="block text-white hover:text-amber-300 hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200 text-lg font-medium"
            >
              Home
            </a>
            <a 
              href="/about" 
              className="block text-white hover:text-amber-300 hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200 text-lg font-medium"
            >
              About
            </a>
            <a 
              href="/contact" 
              className="block text-white hover:text-amber-300 hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200 text-lg font-medium"
            >
              Contact
            </a>
            <div className="flex items-center space-x-3 px-3 pt-2">
              <UserCircleIcon className="w-8 h-8 text-white" />
              <a href="/login" className="flex-1">
                <button className="w-full px-5 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-amber-400 hover:text-white transition-all duration-200 shadow-md">
                  Login
                </button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
