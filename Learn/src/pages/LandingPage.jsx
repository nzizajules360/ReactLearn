import React, { useState, useEffect } from 'react';
import {Tractor , Lightbulb} from 'lucide-react'
import { SparklesIcon, RocketLaunchIcon, ArrowRightIcon, BoltIcon, ShieldCheckIcon, CubeIcon, StarIcon, CheckCircleIcon, ChatBubbleLeftRightIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

function LandingPage() {
  const [currentBackground, setCurrentBackground] = useState(0);

  const backgroundImages = [
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentBackground(index);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 overflow-hidden">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentBackground ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`EcoSwarm Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-emerald-900/70 mix-blend-multiply"></div>
            </div>
          ))}
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBackground 
                  ? 'bg-lime-400 w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <SparklesIcon className="w-5 h-5 text-lime-300" />
                <span className="text-sm font-medium">Welcome to EcoSwarm</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Sustainable
                <span className="block text-lime-300 mt-2">Technology</span>
              </h1>

              <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
                Join the movement for eco-friendly solutions that protect our planet while advancing technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group flex items-center justify-center space-x-2 bg-lime-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                  <span>Join the Swarm</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  <Lightbulb className="w-5 h-5" />
                  <span>Learn More</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold text-lime-300">10K+</div>
                  <div className="text-sm text-green-200">Eco Warriors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-lime-300">50+</div>
                  <div className="text-sm text-green-200">Green Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-lime-300">99%</div>
                  <div className="text-sm text-green-200">Carbon Reduction</div>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="w-96 h-96 mx-auto bg-gradient-to-br from-lime-400/20 to-emerald-600/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center animate-pulse">
                <div className="w-64 h-64 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-md border border-white/40 flex items-center justify-center">
                  <Tractor className="w-24 h-24 text-lime-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
              Eco-Friendly Features
            </h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              Sustainable solutions for a greener tomorrow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BoltIcon, title: 'Energy Efficient', description: 'Optimized performance with minimal energy consumption and carbon footprint', color: 'from-lime-400 to-green-500' },
              { icon: ShieldCheckIcon, title: 'Carbon Neutral', description: '100% carbon neutral operations with verified offset programs', color: 'from-emerald-400 to-green-600' },
              { icon: CubeIcon, title: 'Sustainable Design', description: 'Eco-conscious design principles that reduce environmental impact', color: 'from-teal-400 to-emerald-500' },
              { icon: SparklesIcon, title: 'Green Technology', description: 'Cutting-edge solutions that prioritize environmental sustainability', color: 'from-green-400 to-emerald-600' },
              { icon: RocketLaunchIcon, title: 'Rapid Deployment', description: 'Quick implementation of eco-friendly solutions', color: 'from-lime-500 to-green-600' },
              { icon: ChatBubbleLeftRightIcon, title: 'Eco Community', description: 'Join our community of environmental innovators', color: 'from-emerald-500 to-teal-600' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-3">{feature.title}</h3>
                <p className="text-emerald-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
              Green Plans
            </h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              Choose your path to sustainability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Eco Starter', price: '$29', features: ['5 Green Projects', 'Basic Carbon Tracking', 'Community Support', 'Core Features'], highlighted: false },
              { name: 'Eco Pro', price: '$79', features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Carbon Offset', 'Custom Reports'], highlighted: true },
              { name: 'Eco Enterprise', price: '$199', features: ['Unlimited Everything', 'Dedicated Eco Advisor', '24/7 Support', 'All Features', 'Custom Solutions', 'SLA Guarantee'], highlighted: false }
            ].map((plan, idx) => (
              <div key={idx} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-gradient-to-br from-emerald-700 to-green-600 text-white shadow-2xl transform scale-105' : 'bg-green-50 text-emerald-900 shadow-lg border border-green-200'} transition-all duration-300 hover:shadow-2xl`}>
                {plan.highlighted && (
                  <div className="bg-lime-400 text-emerald-900 text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                    MOST SUSTAINABLE
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? 'text-green-100' : 'text-emerald-700'}>/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircleIcon className={`w-6 h-6 ${plan.highlighted ? 'text-lime-300' : 'text-emerald-600'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${plan.highlighted ? 'bg-lime-400 text-emerald-900 hover:bg-lime-300' : 'bg-emerald-600 text-white hover:bg-emerald-700'} shadow-lg hover:shadow-xl transform hover:scale-105`}>
                  Go Green
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
              What Our Eco Warriors Say
            </h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              Join thousands of environmental champions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO at GreenTech', content: 'EcoSwarm transformed our environmental impact. The carbon reduction is remarkable!', rating: 5 },
              { name: 'Michael Chen', role: 'Sustainability Lead', content: 'Best eco-platform I\'ve used. The features are comprehensive and easy to implement.', rating: 5 },
              { name: 'Emily Rodriguez', role: 'Environmental Manager', content: 'Our carbon footprint decreased by 60% since implementing EcoSwarm solutions!', rating: 5 }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-lime-500" />
                  ))}
                </div>
                <p className="text-emerald-800 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-emerald-900">{testimonial.name}</div>
                    <div className="text-sm text-emerald-700">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Go Green?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of eco-warriors making a difference today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group flex items-center justify-center space-x-2 bg-lime-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <span>Start Eco Journey</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
              <EnvelopeIcon className="w-5 h-5" />
              <span>Contact Eco Team</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;