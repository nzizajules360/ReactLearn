import React from 'react';
import { CheckCircleIcon, StarIcon, SparklesIcon, BoltIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import {Sprout} from 'lucide-react';

function PricingPage() {
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
            <span className="text-white text-sm font-medium">Simple & Transparent</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your
            <span className="block text-lime-300 mt-2">Eco Plan</span>
          </h1>
          
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Select the perfect plan to start your sustainability journey. Every subscription helps fund our environmental initiatives.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
              Sustainable Plans for Every Need
            </h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              From individual eco-warriors to enterprise sustainability teams
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                name: 'Eco Starter', 
                price: '$29', 
                description: 'Perfect for individuals starting their eco-journey',
                features: [
                  '5 Green Projects',
                  'Basic Carbon Tracking',
                  'Community Support',
                  'Core Eco Features',
                  'Monthly Impact Reports',
                  'Eco Learning Resources'
                ], 
                highlighted: false,
                popular: false
              },
              { 
                name: 'Eco Pro', 
                price: '$79', 
                description: 'Ideal for growing teams and serious eco-warriors',
                features: [
                  'Unlimited Projects',
                  'Advanced Carbon Analytics',
                  'Priority Eco Support',
                  'Automated Carbon Offset',
                  'Custom Impact Reports',
                  'API Access',
                  'Team Collaboration',
                  'Custom Eco Metrics'
                ], 
                highlighted: true,
                popular: true
              },
              { 
                name: 'Eco Enterprise', 
                price: '$199', 
                description: 'For organizations leading sustainability efforts',
                features: [
                  'Unlimited Everything',
                  'Dedicated Eco Advisor',
                  '24/7 Premium Support',
                  'Custom Carbon Solutions',
                  'White-label Reports',
                  'Advanced API Access',
                  'SLA Guarantee',
                  'Custom Integrations',
                  'Training & Onboarding'
                ], 
                highlighted: false,
                popular: false
              }
            ].map((plan, idx) => (
              <div key={idx} className={`relative rounded-3xl p-8 ${
                plan.highlighted 
                  ? 'bg-gradient-to-br from-emerald-700 to-green-600 text-white shadow-2xl transform scale-105 border-2 border-lime-400' 
                  : 'bg-white text-emerald-900 shadow-lg border border-emerald-200'
              } transition-all duration-300 hover:shadow-2xl`}>
                
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-lime-400 text-emerald-900 text-sm font-bold px-6 py-2 rounded-full shadow-lg flex items-center space-x-1">
                      <StarIcon className="w-4 h-4" />
                      <span>MOST SUSTAINABLE</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`text-sm mb-4 ${plan.highlighted ? 'text-green-100' : 'text-emerald-600'}`}>
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className={plan.highlighted ? 'text-green-100' : 'text-emerald-700'}>/month</span>
                  </div>
                  <div className={`text-xs ${plan.highlighted ? 'text-lime-300' : 'text-emerald-500'}`}>
                    + 5% donated to environmental causes
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircleIcon className={`w-6 h-6 flex-shrink-0 ${
                        plan.highlighted ? 'text-lime-300' : 'text-emerald-600'
                      }`} />
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                  plan.highlighted 
                    ? 'bg-lime-400 text-emerald-900 hover:bg-lime-300 shadow-lg hover:shadow-xl' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                } transform hover:scale-105`}>
                  Start Eco Journey
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Compare Eco Features
            </h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              See how our plans stack up for your sustainability needs
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-emerald-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-50">
                  <th className="text-left p-6 text-emerald-900 font-bold text-lg">Features</th>
                  <th className="p-6 text-center">
                    <div className="font-bold text-emerald-700">Eco Starter</div>
                    <div className="text-sm text-emerald-600">$29/month</div>
                  </th>
                  <th className="p-6 text-center bg-lime-50 border-l-2 border-r-2 border-lime-300">
                    <div className="font-bold text-emerald-900">Eco Pro</div>
                    <div className="text-sm text-emerald-700">$79/month</div>
                  </th>
                  <th className="p-6 text-center">
                    <div className="font-bold text-emerald-700">Eco Enterprise</div>
                    <div className="text-sm text-emerald-600">$199/month</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Carbon Tracking', starter: 'Basic', pro: 'Advanced', enterprise: 'Enterprise' },
                  { feature: 'Projects Limit', starter: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'Support', starter: 'Community', pro: 'Priority', enterprise: '24/7 Dedicated' },
                  { feature: 'Carbon Offset', starter: 'Manual', pro: 'Automated', enterprise: 'Custom Solutions' },
                  { feature: 'API Access', starter: 'No', pro: 'Yes', enterprise: 'Advanced' },
                  { feature: 'Team Members', starter: '1', pro: 'Up to 10', enterprise: 'Unlimited' },
                  { feature: 'Custom Reports', starter: 'No', pro: 'Yes', enterprise: 'White-label' },
                  { feature: 'SLA Guarantee', starter: 'No', pro: 'No', enterprise: 'Yes' }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-green-50' : 'bg-white'}>
                    <td className="p-6 font-semibold text-emerald-900">{row.feature}</td>
                    <td className="p-6 text-center text-emerald-700">{row.starter}</td>
                    <td className="p-6 text-center font-semibold text-emerald-900 bg-lime-50 border-l-2 border-r-2 border-lime-300">
                      {row.pro}
                    </td>
                    <td className="p-6 text-center text-emerald-700">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Loved by Eco Warriors
            </h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              See how organizations are reducing their carbon footprint with EcoSwarm
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'GreenTech Solutions', 
                role: 'Sustainability Team', 
                content: 'EcoSwarm helped us reduce our carbon emissions by 45% in just 6 months. The analytics are incredible!',
                rating: 5 
              },
              { 
                name: 'EcoStart Inc', 
                role: 'Startup Founder', 
                content: 'The Pro plan gave us everything we needed to track and offset our carbon footprint from day one.',
                rating: 5 
              },
              { 
                name: 'NatureFirst Corp', 
                role: 'Environmental Manager', 
                content: 'Enterprise features allowed us to create custom sustainability reports for all our stakeholders.',
                rating: 5 
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100">
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-emerald-700">
              Everything you need to know about EcoSwarm pricing
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How does the carbon offset donation work?",
                answer: "5% of every subscription is donated to verified environmental organizations focused on reforestation, clean energy, and conservation projects. You'll receive quarterly impact reports showing exactly where your contribution went."
              },
              {
                question: "Can I change plans later?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference for the current billing cycle."
              },
              {
                question: "Is there a free trial?",
                answer: "We offer a 14-day free trial on all plans. No credit card required to start. Experience all features risk-free and see how EcoSwarm can transform your sustainability efforts."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers. For Enterprise plans, we also offer annual billing with custom payment terms."
              },
              {
                question: "Do you offer discounts for nonprofits?",
                answer: "Absolutely! We provide special pricing for registered nonprofits and educational institutions. Contact our team with your details to learn about our nonprofit discount program."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-green-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="text-xl font-bold text-emerald-900 mb-3">{faq.question}</h3>
                <p className="text-emerald-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <SparklesIcon className="w-5 h-5 text-lime-300" />
            <span className="text-white text-sm font-medium">Start Your Eco Journey Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of eco-warriors already reducing their carbon footprint with EcoSwarm
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-lime-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              Start 14-Day Free Trial
            </button>
            <button className="bg-white/10 backdrop-blur-sm border-2 border-lime-300/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-400/20 transition-all duration-300">
              Schedule Eco Demo
            </button>
          </div>
          <p className="text-green-200 text-sm mt-4">
            No credit card required • Cancel anytime • 5% donated to environmental causes
          </p>
        </div>
      </section>
    </div>
  );
}

export default PricingPage;