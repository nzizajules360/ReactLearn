import React from 'react';
import { SparklesIcon, UsersIcon, TrophyIcon, HeartIcon, RocketLaunchIcon, LightBulbIcon } from '@heroicons/react/24/solid';
import {Sprout} from 'lucide-react';

function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-green-700 to-lime-700 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sprout className="w-5 h-5 text-lime-300" />
            <span className="text-white text-sm font-medium">About EcoSwarm</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Building a Sustainable
            <span className="block text-lime-300 mt-2">Digital Future</span>
          </h1>
          
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize technology with eco-friendly solutions that protect our planet while advancing innovation. Join us in creating a greener digital world.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-emerald-900 mb-6">Our Eco Journey</h2>
              <p className="text-lg text-emerald-700 mb-4 leading-relaxed">
                Founded in 2020, EcoSwarm emerged from a shared vision: to bridge the gap between technology and environmental sustainability. What started as a passion project by eco-conscious developers has blossomed into a movement embraced by thousands of environmental champions worldwide.
              </p>
              <p className="text-lg text-emerald-700 leading-relaxed">
                Today, we continue to innovate at the intersection of technology and ecology, creating solutions that not only meet today's needs but safeguard tomorrow's world. Our commitment to planetary health drives every decision we make.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-3xl p-8 shadow-xl border border-emerald-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-emerald-100">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">10K+</div>
                    <div className="text-emerald-700">Eco Warriors</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-emerald-100">
                    <div className="text-4xl font-bold text-lime-600 mb-2">50+</div>
                    <div className="text-emerald-700">Green Projects</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-emerald-100">
                    <div className="text-4xl font-bold text-green-600 mb-2">99%</div>
                    <div className="text-emerald-700">Carbon Reduction</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-emerald-100">
                    <div className="text-4xl font-bold text-emerald-700 mb-2">24/7</div>
                    <div className="text-emerald-700">Eco Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">Our Eco Principles</h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              These core values guide our mission to create sustainable technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sprout,
                title: 'Sustainability',
                description: 'Every solution we build prioritizes environmental impact and long-term ecological balance.',
                color: 'from-lime-400 to-green-500'
              },
              {
                icon: UsersIcon,
                title: 'Community',
                description: 'We believe in the power of collective action. Together, we can create meaningful change.',
                color: 'from-emerald-400 to-green-600'
              },
              {
                icon: HeartIcon,
                title: 'Passion',
                description: 'Our love for the planet fuels our dedication to creating eco-friendly technology solutions.',
                color: 'from-green-400 to-emerald-500'
              },
              {
                icon: TrophyIcon,
                title: 'Excellence',
                description: 'We maintain the highest standards in both technological innovation and environmental stewardship.',
                color: 'from-teal-400 to-emerald-500'
              },
              {
                icon: RocketLaunchIcon,
                title: 'Innovation',
                description: 'We constantly explore new ways to make technology more sustainable and efficient.',
                color: 'from-lime-500 to-green-600'
              },
              {
                icon: LightBulbIcon,
                title: 'Impact',
                description: 'We measure success by the positive environmental change we create for future generations.',
                color: 'from-emerald-500 to-teal-600'
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-3">{value.title}</h3>
                <p className="text-emerald-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">Meet Our Eco Warriors</h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              The passionate team driving EcoSwarm's mission forward
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', initials: 'SJ', color: 'from-emerald-400 to-green-500' },
              { name: 'Michael Chen', role: 'CTO', initials: 'MC', color: 'from-lime-400 to-green-500' },
              { name: 'Emily Rodriguez', role: 'Head of Sustainability', initials: 'ER', color: 'from-green-400 to-emerald-500' },
              { name: 'David Kim', role: 'Lead Eco Developer', initials: 'DK', color: 'from-teal-400 to-emerald-500' }
            ].map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mb-4">
                  <div className={`w-32 h-32 mx-auto bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}>
                    {member.initials}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-emerald-900">{member.name}</h3>
                <p className="text-emerald-700">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join the Eco Revolution?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Help us build a sustainable future through technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/careers">
              <button className="bg-lime-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Join Our Team
              </button>
            </a>
            <a href="/contact">
              <button className="bg-white/10 backdrop-blur-sm border-2 border-lime-300/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-400/20 transition-all duration-300">
                Partner With Us
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;