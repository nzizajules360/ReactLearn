import React from 'react';
import { SparklesIcon, UsersIcon, TrophyIcon, HeartIcon, RocketLaunchIcon, LightBulbIcon } from '@heroicons/react/24/solid';

function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <SparklesIcon className="w-5 h-5 text-amber-400" />
            <span className="text-white text-sm font-medium">About Our Company</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Building the Future
            <span className="block text-amber-400 mt-2">One App at a Time</span>
          </h1>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to empower developers and businesses with cutting-edge tools and technologies that make building amazing applications easier than ever.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Founded in 2020, React App started with a simple vision: to democratize web development and make it accessible to everyone. What began as a small project by a group of passionate developers has grown into a thriving platform used by thousands worldwide.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we continue to innovate and push boundaries, creating tools that not only meet the needs of modern developers but anticipate the challenges of tomorrow. Our commitment to excellence and user satisfaction drives everything we do.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                    <div className="text-gray-600">Happy Users</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                    <div className="text-gray-600">Components</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-4xl font-bold text-pink-600 mb-2">99%</div>
                    <div className="text-gray-600">Satisfaction</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-4xl font-bold text-amber-600 mb-2">24/7</div>
                    <div className="text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide our decisions and shape our culture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: LightBulbIcon,
                title: 'Innovation',
                description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                icon: UsersIcon,
                title: 'User-Centric',
                description: 'Every decision we make puts our users first. Your success is our success.',
                color: 'from-blue-400 to-indigo-500'
              },
              {
                icon: HeartIcon,
                title: 'Passion',
                description: 'We love what we do and it shows in the quality of our work and dedication to our community.',
                color: 'from-pink-400 to-rose-500'
              },
              {
                icon: TrophyIcon,
                title: 'Excellence',
                description: 'We strive for excellence in everything we do, from code quality to customer support.',
                color: 'from-purple-400 to-indigo-500'
              },
              {
                icon: RocketLaunchIcon,
                title: 'Speed',
                description: 'We move fast and iterate quickly, helping you bring your ideas to life without delay.',
                color: 'from-green-400 to-emerald-500'
              },
              {
                icon: SparklesIcon,
                title: 'Quality',
                description: 'We never compromise on quality, ensuring every component is polished and production-ready.',
                color: 'from-amber-400 to-yellow-500'
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented people behind React App
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', initials: 'SJ', color: 'from-blue-400 to-indigo-500' },
              { name: 'Michael Chen', role: 'CTO', initials: 'MC', color: 'from-purple-400 to-pink-500' },
              { name: 'Emily Rodriguez', role: 'Head of Design', initials: 'ER', color: 'from-pink-400 to-rose-500' },
              { name: 'David Kim', role: 'Lead Developer', initials: 'DK', color: 'from-amber-400 to-orange-500' }
            ].map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mb-4">
                  <div className={`w-32 h-32 mx-auto bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}>
                    {member.initials}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Want to Join Our Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're always looking for talented individuals to join our team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/careers">
              <button className="bg-amber-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                View Open Positions
              </button>
            </a>
            <a href="/contact">
              <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;