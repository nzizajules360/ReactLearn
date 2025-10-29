import React, { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  SparklesIcon 
} from '@heroicons/react/24/solid';
import { Sprout } from 'lucide-react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send message');
      setSuccess('Thanks! Your message has been sent.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (e) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-lime-300" />
            <span className="text-white text-sm font-medium">Get In Touch</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's Talk About
            <span className="block text-lime-300 mt-2">Your Eco Journey</span>
          </h1>
          
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Ready to make a difference? Our team of eco-experts is here to help you start your sustainability journey.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-200">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <PaperAirplaneIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-emerald-900">Send us a Message</h2>
                  <p className="text-emerald-700">We typically respond within 2 hours</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-lime-50 border border-lime-200 rounded-xl text-lime-700 text-sm">{success}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 pl-12 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 pl-12 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="enterprise">Enterprise Solution</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us about your sustainability goals and how we can help..."
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-200">
                <h3 className="text-2xl font-bold text-emerald-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: EnvelopeIcon,
                      title: 'Email Us',
                      content: 'hello@ecoswarm.com',
                      description: 'Send us an email anytime',
                      color: 'from-lime-400 to-green-500'
                    },
                    {
                      icon: PhoneIcon,
                      title: 'Call Us',
                      content: '+1 (555) 123-ECO4',
                      description: 'Mon-Fri from 8am to 6pm',
                      color: 'from-emerald-400 to-green-600'
                    },
                    {
                      icon: MapPinIcon,
                      title: 'Visit Us',
                      content: '123 Green Street, Eco City',
                      description: 'Sustainable Business Park',
                      color: 'from-green-400 to-emerald-600'
                    },
                    {
                      icon: ClockIcon,
                      title: 'Office Hours',
                      content: 'Monday - Friday',
                      description: '8:00 AM - 6:00 PM EST',
                      color: 'from-teal-400 to-emerald-500'
                    }
                  ].map((contact, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-4 rounded-xl bg-green-50 border border-emerald-100 hover:border-lime-300 transition-all duration-200">
                      <div className={`w-12 h-12 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <contact.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-900">{contact.title}</h4>
                        <p className="text-emerald-700 font-medium">{contact.content}</p>
                        <p className="text-emerald-600 text-sm">{contact.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-gradient-to-br from-emerald-700 to-green-600 rounded-3xl p-8 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <SparklesIcon className="w-6 h-6 text-lime-300" />
                  <h3 className="text-xl font-bold">Why Contact EcoSwarm?</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Sprout className="w-4 h-4 text-lime-300" />
                    <span>Free sustainability consultation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sprout className="w-4 h-4 text-lime-300" />
                    <span>Custom carbon reduction plans</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sprout className="w-4 h-4 text-lime-300" />
                    <span>Enterprise-grade eco solutions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sprout className="w-4 h-4 text-lime-300" />
                    <span>Dedicated eco-expert support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Common Questions
            </h2>
            <p className="text-xl text-emerald-700">
              Quick answers to frequently asked questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly do you respond to inquiries?",
                answer: "We pride ourselves on quick responses. Most emails are answered within 2 hours during business hours, and all inquiries receive a response within 24 hours."
              },
              {
                question: "Do you offer free consultations?",
                answer: "Absolutely! We offer complimentary 30-minute sustainability consultations to help you understand how EcoSwarm can benefit your organization."
              },
              {
                question: "Can I schedule a product demo?",
                answer: "Yes! We'd love to show you EcoSwarm in action. Use our contact form to request a personalized demo at your convenience."
              },
              {
                question: "Do you work with international clients?",
                answer: "Yes, we work with clients worldwide. Our platform supports multiple languages and currencies, and our team is available across different time zones."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-green-50 rounded-2xl p-6 border border-emerald-200 hover:border-lime-300 transition-all duration-200">
                <h3 className="text-lg font-bold text-emerald-900 mb-3">{faq.question}</h3>
                <p className="text-emerald-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Eco Journey Today
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations already making a positive environmental impact with EcoSwarm
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-lime-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              Schedule Free Consultation
            </button>
            <button className="bg-white/10 backdrop-blur-sm border-2 border-lime-300/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-400/20 transition-all duration-300">
              View Pricing Plans
            </button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-12 border-t border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">Find Us</h3>
            <p className="text-emerald-700">Visit our sustainable headquarters</p>
          </div>
          
          {/* Placeholder for Map */}
          <div className="bg-green-100 rounded-2xl h-64 flex items-center justify-center border-2 border-dashed border-emerald-300">
            <div className="text-center">
              <MapPinIcon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <p className="text-emerald-700 font-semibold">Interactive Map</p>
              <p className="text-emerald-600 text-sm">123 Green Street, Eco City</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;