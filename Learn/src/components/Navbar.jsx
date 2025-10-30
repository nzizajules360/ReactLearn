import React, { useState, useEffect } from 'react';
import { UserCircleIcon, Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import {Sprout} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(user);
        setUserRole(userData.role || 'user');
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-emerald-700/90 to-green-600/90 backdrop-blur-xl shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-lime-100 to-emerald-100 rounded-xl flex items-center justify-center">
              <img src="/logo.svg" alt="EcoSwarm" className="w-6 h-6" />
            </div>
            <a href="/">
              <h2 className="text-lime-300 font-bold text-2xl tracking-tight">
                EcoSwarm
              </h2>
            </a>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <a 
                href="/" 
                className="text-white hover:text-lime-300 transition-colors duration-200 font-medium hover:underline underline-offset-4"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className="text-white hover:text-lime-300 transition-colors duration-200 font-medium hover:underline underline-offset-4"
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/features" 
                className="text-white hover:text-lime-300 transition-colors duration-200 font-medium hover:underline underline-offset-4"
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="/training" 
                className="text-white hover:text-lime-300 transition-colors duration-200 font-medium hover:underline underline-offset-4"
              >
                Training
              </a>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <a 
                    href="/dashboard" 
                    className="text-white hover:text-lime-300 transition-colors duration-200 font-medium hover:underline underline-offset-4"
                  >
                    Dashboard
                  </a>
                </li>
                {userRole === 'admin' && (
                  <li>
                    <a 
                      href="/admin" 
                      className="text-white hover:text-lime-300 transition-colors duration-200 font-medium hover:underline underline-offset-4"
                    >
                      Admin
                    </a>
                  </li>
                )}
              </>
            )}
            <li>
              <a 
                href="/contact" 
                className="text-white hover:text-lime-300 transition-colors duration-200 font-medium hover:underline underline-offset-4"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <a href="/dashboard">
                  <UserCircleIcon className="w-8 h-8 text-white hover:text-lime-300 transition-colors duration-200 cursor-pointer hover:scale-110" />
                </a>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <UserCircleIcon className="w-8 h-8 text-white hover:text-lime-300 transition-colors duration-200 cursor-pointer hover:scale-110" />
                <a href="/login">
                  <button className="px-6 py-2 bg-lime-400 text-emerald-900 font-bold rounded-xl hover:bg-lime-300 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 border-2 border-lime-300">
                    Join the Swarm
                  </button>
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-lime-300 transition-colors duration-200 p-1 rounded-lg hover:bg-emerald-600"
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
          <div className="md:hidden pb-4 pt-2 space-y-2 bg-emerald-700/95 backdrop-blur-sm rounded-lg mt-2">
            <a 
              href="/" 
              className="block text-white hover:text-lime-300 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/about" 
              className="block text-white hover:text-lime-300 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="/features" 
              className="block text-white hover:text-lime-300 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="/training" 
              className="block text-white hover:text-lime-300 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Training
            </a>
            {isLoggedIn && (
              <>
                <a 
                  href="/dashboard" 
                  className="block text-white hover:text-lime-300 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </a>
                {userRole === 'admin' && (
                  <a 
                    href="/admin" 
                    className="block text-white hover:text-lime-300 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin
                  </a>
                )}
              </>
            )}
            <a 
              href="/contact" 
              className="block text-white hover:text-lime-300 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex items-center space-x-3 px-4 pt-3 border-t border-emerald-500">
              {isLoggedIn ? (
                <>
                  <a href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <UserCircleIcon className="w-8 h-8 text-lime-300" />
                  </a>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex-1 px-5 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <UserCircleIcon className="w-8 h-8 text-lime-300" />
                  <a href="/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full px-5 py-3 bg-lime-400 text-emerald-900 font-bold rounded-xl hover:bg-lime-300 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                      Join the Swarm
                    </button>
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;