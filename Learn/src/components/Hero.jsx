import React from 'react';
import { SparklesIcon, RocketLaunchIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <SparklesIcon className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">Welcome to the Future</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Build Amazing
              <span className="block text-amber-400 mt-2">React Apps</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-xl">
              Create stunning web applications with modern design, powerful features, and seamless user experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group flex items-center justify-center space-x-2 bg-amber-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                <span>Get Started</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                <RocketLaunchIcon className="w-5 h-5" />
                <span>Learn More</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-amber-400">10K+</div>
                <div className="text-sm text-blue-200">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">50+</div>
                <div className="text-sm text-blue-200">Components</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">99%</div>
                <div className="text-sm text-blue-200">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="relative hidden md:block">
            <div className="relative">
              {/* Floating Card 1 */}
              <div className="absolute top-0 right-0 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Fast Performance</div>
                    <div className="text-blue-200 text-sm">Lightning speed</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute top-32 left-0 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl animate-float-delayed">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <RocketLaunchIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Easy to Use</div>
                    <div className="text-blue-200 text-sm">Simple & intuitive</div>
                  </div>
                </div>
              </div>

              {/* Main Visual Circle */}
              <div className="w-96 h-96 mx-auto mt-20 bg-gradient-to-br from-amber-400/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center animate-pulse-slow">
                <div className="w-64 h-64 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-md border border-white/40 flex items-center justify-center">
                  <RocketLaunchIcon className="w-24 h-24 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}

export default Hero;