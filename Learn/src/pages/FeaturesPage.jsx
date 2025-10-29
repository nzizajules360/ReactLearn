import React from 'react';
import { 
  SparklesIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  CloudIcon,
  UserGroupIcon,
  CogIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  EyeIcon,
  ServerIcon
} from '@heroicons/react/24/solid';
import { Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

function FeaturesPage() {
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
            <SparklesIcon className="w-5 h-5 text-lime-300" />
            <span className="text-white text-sm font-medium">Powerful Eco Features</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Everything You Need
            <span className="block text-lime-300 mt-2">For Sustainability</span>
          </h1>
          
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Discover how EcoSwarm's comprehensive suite of tools can help you measure, manage, and reduce your environmental impact effectively.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
              Core Eco Features
            </h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for environmental sustainability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ChartBarIcon,
                title: 'Carbon Footprint Analytics',
                description: 'Track and analyze your carbon emissions with detailed visualizations and actionable insights.',
                features: ['Real-time emissions tracking', 'Historical data analysis', 'Custom reporting', 'Industry benchmarking'],
                color: 'from-emerald-400 to-green-600'
              },
              {
                icon: Sprout,
                title: 'Automated Carbon Offset',
                description: 'Automatically offset your carbon emissions through verified environmental projects worldwide.',
                features: ['Verified offset projects', 'Automatic calculations', 'Impact certificates', 'Project transparency'],
                color: 'from-lime-400 to-green-500'
              },
              {
                icon: BoltIcon,
                title: 'Energy Efficiency Monitoring',
                description: 'Monitor energy consumption patterns and identify opportunities for efficiency improvements.',
                features: ['Smart meter integration', 'Energy usage patterns', 'Efficiency recommendations', 'Cost savings analysis'],
                color: 'from-green-400 to-emerald-600'
              },
              {
                icon: ShieldCheckIcon,
                title: 'Sustainability Compliance',
                description: 'Stay compliant with environmental regulations and sustainability reporting standards.',
                features: ['Regulatory compliance', 'ESG reporting', 'Audit trails', 'Certification support'],
                color: 'from-teal-400 to-emerald-500'
              },
              {
                icon: UserGroupIcon,
                title: 'Team Collaboration',
                description: 'Engage your entire team in sustainability efforts with collaborative tools and shared goals.',
                features: ['Role-based access', 'Team challenges', 'Progress sharing', 'Collaborative goals'],
                color: 'from-emerald-500 to-teal-600'
              },
              {
                icon: CloudIcon,
                title: 'Cloud Infrastructure',
                description: 'Green-powered cloud infrastructure that minimizes environmental impact while maximizing performance.',
                features: ['Renewable energy hosting', 'Carbon-neutral operations', 'Scalable architecture', 'Global CDN'],
                color: 'from-lime-500 to-green-600'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-3">{feature.title}</h3>
                <p className="text-emerald-700 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-emerald-700">
                      <CheckCircleIcon className="w-5 h-5 text-lime-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Analytics Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full px-4 py-2 mb-6">
                <ChartBarIcon className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700 text-sm font-medium">Advanced Analytics</span>
              </div>
              
              <h2 className="text-4xl font-bold text-emerald-900 mb-6">
                Deep Insights into Your Environmental Impact
              </h2>
              
              <p className="text-lg text-emerald-700 mb-8 leading-relaxed">
                Our advanced analytics platform provides comprehensive insights into your sustainability performance, helping you make data-driven decisions for maximum environmental impact.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Real-time Dashboard',
                    description: 'Monitor your carbon footprint and sustainability metrics in real-time with interactive dashboards.'
                  },
                  {
                    title: 'Predictive Analytics',
                    description: 'Forecast future environmental impact and identify potential areas for improvement.'
                  },
                  {
                    title: 'Custom Reporting',
                    description: 'Generate detailed reports tailored to your specific sustainability goals and compliance needs.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <EyeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-emerald-900 mb-2">{item.title}</h4>
                      <p className="text-emerald-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link 
                  to="/free-trial" 
                  className="bg-lime-500 text-emerald-900 px-6 py-3 rounded-xl font-bold hover:bg-lime-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  Try Free for 14 Days
                </Link>
                <Link 
                  to="/schedule-demo" 
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center border border-emerald-500"
                >
                  See Live Demo
                </Link>
              </div>
            </div>

            <div className="relative">
              {/* Analytics Dashboard Mockup */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-emerald-600 font-semibold">Carbon Dashboard</div>
                    <div className="text-2xl font-bold text-emerald-900">Current Impact</div>
                  </div>
                  <div className="bg-lime-100 text-lime-800 px-3 py-1 rounded-full text-sm font-semibold">
                    -15% This Month
                  </div>
                </div>

                {/* Mock Chart */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-700">Carbon Emissions</span>
                    <span className="font-semibold text-emerald-900">45.2 tCO₂e</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-3">
                    <div className="bg-gradient-to-r from-lime-400 to-emerald-600 h-3 rounded-full w-3/4"></div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-emerald-700">Energy Consumption</span>
                    <span className="font-semibold text-emerald-900">12.8 MWh</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-3">
                    <div className="bg-gradient-to-r from-lime-400 to-emerald-600 h-3 rounded-full w-2/3"></div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-emerald-700">Waste Reduction</span>
                    <span className="font-semibold text-emerald-900">28%</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-3">
                    <div className="bg-gradient-to-r from-lime-400 to-emerald-600 h-3 rounded-full w-1/2"></div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-emerald-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-emerald-900">15%</div>
                      <div className="text-xs text-emerald-600">Reduction</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-emerald-900">8</div>
                      <div className="text-xs text-emerald-600">Goals Met</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-emerald-900">92%</div>
                      <div className="text-xs text-emerald-600">On Track</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              Connect EcoSwarm with your existing tools and workflows
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Slack', icon: '💬', description: 'Real-time notifications and team updates' },
              { name: 'Google Workspace', icon: '📊', description: 'Import data from Google Sheets and Drive' },
              { name: 'Salesforce', icon: '☁️', description: 'Sync with your CRM and customer data' },
              { name: 'QuickBooks', icon: '💰', description: 'Financial data integration for cost analysis' },
              { name: 'Azure', icon: '⚡', description: 'Cloud infrastructure monitoring' },
              { name: 'AWS', icon: '🌐', description: 'Amazon Web Services integration' },
              { name: 'Jira', icon: '📋', description: 'Project management and task tracking' },
              { name: 'API Access', icon: '🔌', description: 'Custom integrations with REST API' }
            ].map((integration, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-emerald-200">
                  {integration.icon}
                </div>
                <h3 className="text-lg font-bold text-emerald-900 mb-2">{integration.name}</h3>
                <p className="text-sm text-emerald-700">{integration.description}</p>
              </div>
            ))}
          </div>

          {/* Integration CTA */}
          <div className="text-center mt-12">
            <p className="text-emerald-700 mb-6">Want to see how EcoSwarm integrates with your specific tools?</p>
            <Link 
              to="/schedule-demo" 
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Request Integration Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full px-4 py-2 mb-6">
                <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700 text-sm font-medium">Enterprise Security</span>
              </div>
              
              <h2 className="text-4xl font-bold text-emerald-900 mb-6">
                Built with Security and Compliance in Mind
              </h2>
              
              <p className="text-lg text-emerald-700 mb-8 leading-relaxed">
                EcoSwarm meets the highest security standards while ensuring compliance with global environmental regulations and data protection laws.
              </p>

              <div className="space-y-4">
                {[
                  'SOC 2 Type II Certified',
                  'GDPR & CCPA Compliant',
                  'End-to-end encryption',
                  'Regular security audits',
                  'Role-based access control',
                  'Data backup & disaster recovery'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-lime-500 flex-shrink-0" />
                    <span className="text-emerald-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Security CTA */}
              <div className="mt-8">
                <Link 
                  to="/free-trial" 
                  className="inline-flex items-center space-x-2 bg-lime-500 text-emerald-900 px-6 py-3 rounded-xl font-bold hover:bg-lime-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span>Start Secure Free Trial</span>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-200">
                <div className="flex items-center space-x-3 mb-6">
                  <ServerIcon className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-lg font-bold text-emerald-900">Security Features</div>
                    <div className="text-emerald-700">Enterprise-grade protection</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                    <span className="text-emerald-700">Data Encryption</span>
                    <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                    <span className="text-emerald-700">Access Control</span>
                    <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                    <span className="text-emerald-700">Audit Logging</span>
                    <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                    <span className="text-emerald-700">Compliance Monitoring</span>
                    <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <RocketLaunchIcon className="w-5 h-5 text-lime-300" />
            <span className="text-white text-sm font-medium">Ready to Get Started?</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience the Power of EcoSwarm
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations using EcoSwarm to drive their sustainability initiatives forward
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/free-trial" 
              className="bg-lime-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/schedule-demo" 
              className="bg-white/10 backdrop-blur-sm border-2 border-lime-300/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-400/20 transition-all duration-300"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="text-green-200 text-sm mt-4">
            No credit card required • 14-day free trial • Full feature access
          </p>
        </div>
      </section>
    </div>
  );
}

export default FeaturesPage;