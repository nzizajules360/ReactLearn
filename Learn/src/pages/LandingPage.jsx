import React from 'react';
import { SparklesIcon, RocketLaunchIcon, ArrowRightIcon, BoltIcon, ShieldCheckIcon, CubeIcon, StarIcon, CheckCircleIcon, ChatBubbleLeftRightIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <SparklesIcon className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium">Welcome to the Future</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Build Amazing
                <span className="block text-amber-400 mt-2">React Apps</span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Create stunning web applications with modern design, powerful features, and seamless user experiences.
              </p>

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

            <div className="relative hidden md:block">
              <div className="w-96 h-96 mx-auto bg-gradient-to-br from-amber-400/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center animate-pulse">
                <div className="w-64 h-64 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-md border border-white/40 flex items-center justify-center">
                  <RocketLaunchIcon className="w-24 h-24 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build modern applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BoltIcon, title: 'Lightning Fast', description: 'Optimized performance for instant load times and smooth interactions', color: 'from-yellow-400 to-orange-500' },
              { icon: ShieldCheckIcon, title: 'Secure & Reliable', description: 'Enterprise-grade security to keep your data safe and protected', color: 'from-green-400 to-emerald-500' },
              { icon: CubeIcon, title: 'Modular Design', description: 'Flexible components that adapt to your unique needs', color: 'from-blue-400 to-indigo-500' },
              { icon: SparklesIcon, title: 'Beautiful UI', description: 'Stunning interfaces that delight users and drive engagement', color: 'from-purple-400 to-pink-500' },
              { icon: RocketLaunchIcon, title: 'Easy Deploy', description: 'Deploy your apps with one click to production', color: 'from-red-400 to-rose-500' },
              { icon: ChatBubbleLeftRightIcon, title: '24/7 Support', description: 'Round-the-clock assistance whenever you need help', color: 'from-cyan-400 to-blue-500' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$29', features: ['5 Projects', '10GB Storage', 'Basic Support', 'Core Features'], highlighted: false },
              { name: 'Pro', price: '$79', features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Features', 'Custom Domain'], highlighted: true },
              { name: 'Enterprise', price: '$199', features: ['Unlimited Everything', '1TB Storage', '24/7 Dedicated Support', 'All Features', 'Custom Solutions', 'SLA Guarantee'], highlighted: false }
            ].map((plan, idx) => (
              <div key={idx} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl transform scale-105' : 'bg-gray-50 text-gray-900 shadow-lg'} transition-all duration-300 hover:shadow-2xl`}>
                {plan.highlighted && (
                  <div className="bg-amber-400 text-blue-900 text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-600'}>/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircleIcon className={`w-6 h-6 ${plan.highlighted ? 'text-amber-400' : 'text-blue-600'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${plan.highlighted ? 'bg-amber-400 text-blue-900 hover:bg-amber-300' : 'bg-blue-600 text-white hover:bg-blue-700'} shadow-lg hover:shadow-xl transform hover:scale-105`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO at TechStart', content: 'This platform transformed how we build applications. The speed and quality are unmatched!', rating: 5 },
              { name: 'Michael Chen', role: 'Lead Developer', content: 'Best development experience I\'ve had. The components are beautiful and easy to customize.', rating: 5 },
              { name: 'Emily Rodriguez', role: 'Product Manager', content: 'Our team productivity skyrocketed. We ship features 3x faster now!', rating: 5 }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers building amazing applications today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group flex items-center justify-center space-x-2 bg-amber-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <span>Start Free Trial</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
              <EnvelopeIcon className="w-5 h-5" />
              <span>Contact Sales</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;