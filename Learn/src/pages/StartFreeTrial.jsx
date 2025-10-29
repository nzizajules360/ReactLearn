import React, { useState } from 'react';
import { 
  CheckCircleIcon, 
  StarIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  UserGroupIcon,
  SparklesIcon,
  LockClosedIcon
} from '@heroicons/react/24/solid';

function StartFreeTrial() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    plan: 'pro'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle free trial signup
    console.log('Free trial signup:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-lime-100 text-lime-800 rounded-full px-4 py-2 mb-4">
                <SparklesIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">14-Day Free Trial</span>
              </div>
              <h1 className="text-4xl font-bold text-emerald-900 mb-4">
                Start Your Eco Journey
              </h1>
              <p className="text-emerald-700 text-lg">
                No credit card required • Full feature access • Cancel anytime
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Plan Selection */}
              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-3">
                  Choose Your Trial Plan
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'starter', name: 'Eco Starter', price: '$29/mo', features: ['5 Projects', 'Basic Features'] },
                    { id: 'pro', name: 'Eco Pro', price: '$79/mo', features: ['Unlimited', 'All Features'], popular: true }
                  ].map((plan) => (
                    <label key={plan.id} className="relative">
                      <input
                        type="radio"
                        name="plan"
                        value={plan.id}
                        checked={formData.plan === plan.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 ${
                        formData.plan === plan.id 
                          ? 'border-lime-500 bg-lime-50 shadow-lg' 
                          : 'border-emerald-200 hover:border-emerald-300'
                      }`}>
                        {plan.popular && (
                          <div className="absolute -top-2 -right-2">
                            <div className="bg-lime-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              POPULAR
                            </div>
                          </div>
                        )}
                        <div className="font-semibold text-emerald-900">{plan.name}</div>
                        <div className="text-lg font-bold text-emerald-700">{plan.price}</div>
                        <div className="text-xs text-emerald-600 mt-1">
                          {plan.features.join(' • ')}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Create Password *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white pr-12"
                    />
                    <LockClosedIcon className="w-5 h-5 text-emerald-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-lime-600 border-emerald-300 rounded focus:ring-lime-500 mt-1 cursor-pointer"
                />
                <span className="text-sm text-emerald-700">
                  I agree to the{' '}
                  <a href="/terms" className="text-lime-600 hover:text-lime-700 font-semibold">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-lime-600 hover:text-lime-700 font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
              >
                Start 14-Day Free Trial
              </button>

              <p className="text-center text-emerald-600 text-sm">
                No credit card required • 5% of future subscriptions donated to environmental causes
              </p>
            </form>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-8">
            {/* What's Included */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-200">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center space-x-2">
                <StarIcon className="w-6 h-6 text-lime-500" />
                <span>What's Included in Your Trial</span>
              </h3>
              
              <div className="space-y-4">
                {[
                  'Full access to all Eco Pro features',
                  'Unlimited carbon tracking projects',
                  'Advanced analytics & reporting',
                  'Team collaboration tools',
                  'API access & integrations',
                  'Priority email support',
                  'Custom carbon offset programs',
                  'Exportable sustainability reports'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-lime-500 flex-shrink-0" />
                    <span className="text-emerald-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security & Trust */}
            <div className="bg-gradient-to-br from-emerald-700 to-green-600 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-lime-300" />
                <span>Secure & Trusted</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-lime-300" />
                  <span className="text-green-100">Enterprise-grade security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-lime-300" />
                  <span className="text-green-100">SOC 2 Type II certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-lime-300" />
                  <span className="text-green-100">GDPR & CCPA compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-lime-300" />
                  <span className="text-green-100">Data encrypted at rest & in transit</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-900">10K+</div>
                <div className="text-xs text-emerald-600">Eco Warriors</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-900">45%</div>
                <div className="text-xs text-emerald-600">Avg. Carbon Reduction</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-900">4.9/5</div>
                <div className="text-xs text-emerald-600">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartFreeTrial;