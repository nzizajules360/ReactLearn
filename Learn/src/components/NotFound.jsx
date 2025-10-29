import React from 'react';
import { HomeIcon, ArrowLeftIcon, MagnifyingGlassIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden animate-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* 404 Display */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-9xl md:text-[200px] font-black text-white/10 select-none animate-pulse-slow">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <ExclamationTriangleIcon className="w-24 h-24 md:w-32 md:h-32 text-amber-400 animate-bounce" />
                <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 text-amber-400 animate-ping opacity-30">
                  <ExclamationTriangleIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            The page you're looking for seems to have wandered off into the digital void. Don't worry, we'll help you find your way back!
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8 animate-fade-in animation-delay-400">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for what you need..."
                className="w-full px-4 py-4 pl-12 border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-blue-200 focus:border-amber-400 focus:outline-none transition-all duration-200 focus:scale-105"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-600">
            <a href="/">
              <button className="group flex items-center justify-center space-x-2 bg-amber-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:rotate-2">
                <HomeIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Back to Home</span>
              </button>
            </a>
            
            <button 
              onClick={() => window.history.back()}
              className="group flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:-rotate-2">
              <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-white/20 animate-fade-in animation-delay-800">
            <p className="text-blue-100 mb-4 font-semibold">Or try these popular pages:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/login', label: 'Login' }
              ].map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href} 
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                  style={{ animationDelay: `${1000 + idx * 100}ms` }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-8 animate-fade-in animation-delay-1000">
          <p className="text-white/60 text-sm animate-pulse">
            Error Code: 404 | This page took a vacation 🏖️
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0.5;
          }
          90% {
            opacity: 0.3;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        .animate-float {
          animation: float 6s ease-in infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

export default NotFound;