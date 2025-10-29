import React, { useState } from 'react';
import { 
  CalendarIcon, 
  ClockIcon, 
  VideoCameraIcon, 
  UserGroupIcon,
  ChartBarIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';
import { Sprout } from 'lucide-react';
function ScheduleDemo() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    companySize: '',
    useCase: '',
    date: '',
    time: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle demo scheduling
    console.log('Demo scheduled:', formData);
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full px-4 py-2 mb-6">
            <VideoCameraIcon className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 text-sm font-medium">Personalized Demo</span>
          </div>
          
          <h1 className="text-5xl font-bold text-emerald-900 mb-6">
            Schedule a Personalized Demo
          </h1>
          
          <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
            See how EcoSwarm can transform your sustainability efforts with a 1-on-1 demo tailored to your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-200">
            <h2 className="text-3xl font-bold text-emerald-900 mb-2">Book Your Demo</h2>
            <p className="text-emerald-700 mb-8">30-minute personalized walkthrough</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Company Size *
                  </label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">
                  Primary Use Case *
                </label>
                <select
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                >
                  <option value="">Select use case</option>
                  <option value="carbon-tracking">Carbon Emissions Tracking</option>
                  <option value="sustainability-reporting">Sustainability Reporting</option>
                  <option value="compliance">Regulatory Compliance</option>
                  <option value="team-engagement">Team Engagement & Goals</option>
                  <option value="supply-chain">Supply Chain Sustainability</option>
                  <option value="esg">ESG Reporting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                    />
                    <CalendarIcon className="w-5 h-5 text-emerald-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time} EST</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">
                  Specific Questions or Goals
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="What specific sustainability challenges are you facing? Any particular features you'd like to see?"
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <CalendarIcon className="w-5 h-5" />
                <span>Schedule My Demo</span>
              </button>

              <p className="text-center text-emerald-600 text-sm">
                You'll receive a confirmation email with calendar invite and meeting details
              </p>
            </form>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-8">
            {/* What to Expect */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-200">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center space-x-2">
                <SparklesIcon className="w-6 h-6 text-lime-500" />
                <span>What to Expect</span>
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    icon: ChartBarIcon,
                    title: 'Live Platform Walkthrough',
                    description: 'See EcoSwarm in action with real data and scenarios'
                  },
                  {
                    icon: UserGroupIcon,
                    title: '1-on-1 with Eco Expert',
                    description: 'Personalized consultation with our sustainability specialist'
                  },
                  {
                    icon: ClockIcon,
                    title: '30-Minute Session',
                    description: 'Focused demo covering your specific use cases and goals'
                  },
                  {
                    icon: Sprout,
                    title: 'Custom Solutions',
                    description: 'Tailored recommendations for your sustainability journey'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-emerald-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-1">{item.title}</h4>
                      <p className="text-emerald-700 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo Agenda */}
            <div className="bg-gradient-to-br from-emerald-700 to-green-600 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Demo Agenda</h3>
              
              <div className="space-y-3">
                {[
                  'Introduction & Your Goals (5 min)',
                  'Platform Overview & Key Features (10 min)',
                  'Live Demo - Your Use Cases (10 min)',
                  'Q&A & Next Steps (5 min)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-900 text-sm font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-green-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-emerald-200">
                <div className="text-lg font-bold text-emerald-900">500+</div>
                <div className="text-xs text-emerald-600">Demos Completed</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-emerald-200">
                <div className="text-lg font-bold text-emerald-900">98%</div>
                <div className="text-xs text-emerald-600">Satisfaction Rate</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-emerald-200">
                <div className="text-lg font-bold text-emerald-900">24h</div>
                <div className="text-xs text-emerald-600">Avg. Response Time</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-emerald-200">
                <div className="text-lg font-bold text-emerald-900">45%</div>
                <div className="text-xs text-emerald-600">Become Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleDemo;