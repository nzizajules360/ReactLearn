import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Star, 
  Users, 
  Zap,
  ArrowRight,
  CreditCard,
  Calendar,
  Sparkles,
  Crown,
  Rocket,
  BookOpen,
  Smartphone,
  X
} from 'lucide-react';

const TrainingPricingPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    if (plan.price[billingCycle] === 0) {
      // Free plan - direct to courses
      navigate('/training/courses');
    } else {
      // Paid plan - show payment provider selection
      setSelectedPlan(plan);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentProvider = (provider) => {
    setShowPaymentModal(false);
    const planQuery = selectedPlan.name.toLowerCase().replace(' ', '-');
    navigate(`/training/checkout?plan=${planQuery}&provider=${provider}`);
  };
  
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      icon: BookOpen,
      price: { monthly: 0, yearly: 0 },
      color: 'from-gray-500 to-gray-600',
      features: [
        'Access to 5 basic courses',
        'Community forum access',
        'Basic workspace features',
        'Email support',
        'Certificate of completion'
      ],
      limitations: [
        'Limited IoT devices',
        'No AI assistant',
        'Basic collaboration tools'
      ],
      cta: 'Get Started',
      ctaLink: '/training/courses',
      popular: false
    },
    {
      name: 'Pro',
      description: 'All courses for 1 month',
      icon: Rocket,
      price: { monthly: 19, yearly: 190 },
      color: 'from-emerald-500 to-green-600',
      features: [
        'Access to ALL courses for 1 month',
        'AI assistant integration',
        'Advanced workspace with IoT simulation',
        'Real-time collaboration',
        'Priority email support',
        'Downloadable resources',
        'Course certificates',
        'Team project access'
      ],
      limitations: [
        'Access expires after 1 month',
        'No advanced AI features'
      ],
      cta: 'Start Pro Trial',
      ctaLink: '/training/checkout?plan=pro',
      popular: true
    },
    {
      name: 'Premium',
      description: 'Lifetime access to all courses',
      icon: Crown,
      price: { monthly: 49, yearly: 490 },
      color: 'from-purple-500 to-pink-600',
      features: [
        'Lifetime access to ALL courses',
        'Advanced AI assistant with custom tasks',
        'Unlimited IoT device simulation',
        'Premium collaboration tools',
        '24/7 priority support',
        'All downloadable resources',
        'Verified certificates',
        'Team leadership access',
        'Custom course creation',
        'API access for workspace'
      ],
      limitations: [],
      cta: 'Go Premium',
      ctaLink: '/training/checkout?plan=premium',
      popular: false
    }
  ];

  const communityPlans = [
    {
      name: 'Community Basic',
      description: 'Join and participate in teams',
      icon: Users,
      price: { monthly: 9, yearly: 90 },
      features: [
        'Join up to 3 teams',
        'Complete team tasks',
        'Basic task management',
        'Team chat access',
        'Monthly progress reports'
      ],
      cta: 'Join Community',
      ctaLink: '/training/checkout?plan=community-basic'
    },
    {
      name: 'Community Plus',
      description: 'Lead teams and manage projects',
      icon: Star,
      price: { monthly: 29, yearly: 290 },
      features: [
        'Lead up to 5 teams',
        'Create and assign tasks',
        'Advanced team analytics',
        'Custom team workflows',
        'Team performance tracking',
        'Priority task support'
      ],
      cta: 'Lead Teams',
      ctaLink: '/training/checkout?plan=community-plus'
    }
  ];

  const individualCourses = [
    {
      title: 'IoT Fundamentals',
      price: 29,
      duration: '6 weeks',
      level: 'Beginner',
      topics: ['Sensors & Actuators', 'Arduino Basics', 'IoT Protocols', 'Cloud Integration']
    },
    {
      title: 'Advanced IoT Systems',
      price: 49,
      duration: '8 weeks',
      level: 'Advanced',
      topics: ['Edge Computing', 'Machine Learning', 'Security', 'Large-scale Deployments']
    },
    {
      title: 'EcoSwarm Tools Mastery',
      price: 39,
      duration: '4 weeks',
      level: 'Intermediate',
      topics: ['Device Management', 'Data Analytics', 'Automation', 'API Integration']
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-emerald-900 mb-4">Choose Your Learning Path</h1>
        <p className="text-lg text-emerald-600 max-w-2xl mx-auto">
          Select the perfect plan for your learning goals. Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg border border-emerald-200 p-1 inline-flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              billingCycle === 'monthly'
                ? 'bg-emerald-500 text-white'
                : 'text-emerald-700 hover:text-emerald-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              billingCycle === 'yearly'
                ? 'bg-emerald-500 text-white'
                : 'text-emerald-700 hover:text-emerald-900'
            }`}
          >
            Yearly (Save 17%)
          </button>
        </div>
      </div>

      {/* Main Plans */}
      <div>
        <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">Learning Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = plan.price[billingCycle];
            
            return (
              <div
                key={index}
                className={`relative rounded-lg border-2 ${
                  plan.popular
                    ? 'border-emerald-500 shadow-xl transform scale-105'
                    : 'border-emerald-200'
                } bg-white overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                
                <div className={`p-6 bg-gradient-to-br ${plan.color} text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8" />
                    {plan.popular && <Star className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${price}</span>
                    <span className="text-sm ml-1">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-emerald-700">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-500">
                        <span className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400">×</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full text-center py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Community Plans */}
      <div>
        <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">Community Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communityPlans.map((plan, index) => {
            const Icon = plan.icon;
            const price = plan.price[billingCycle];
            
            return (
              <div key={index} className="bg-white rounded-lg border border-emerald-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-900">{plan.name}</h3>
                    <p className="text-sm text-emerald-600">{plan.description}</p>
                  </div>
                </div>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-2xl font-bold text-emerald-900">${price}</span>
                  <span className="text-sm text-emerald-600 ml-1">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-emerald-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className="w-full text-center py-2 px-4 bg-emerald-50 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-100 transition-all duration-200"
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Courses */}
      <div>
        <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">Individual Courses</h2>
        <p className="text-center text-emerald-600 mb-8">
          Purchase individual courses if you don't need a full subscription
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {individualCourses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg border border-emerald-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  {course.level}
                </span>
                <span className="text-sm text-emerald-600">{course.duration}</span>
              </div>
              
              <h3 className="text-lg font-bold text-emerald-900 mb-2">{course.title}</h3>
              
              <div className="mb-4">
                <div className="text-2xl font-bold text-emerald-900">${course.price}</div>
                <div className="text-sm text-emerald-600">One-time payment</div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-emerald-900 mb-2">Topics:</h4>
                <ul className="space-y-1">
                  {course.topics.map((topic, idx) => (
                    <li key={idx} className="text-xs text-emerald-600">• {topic}</li>
                  ))}
                </ul>
              </div>
              
              <Link
                to={`/training/checkout?course=${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="block w-full text-center py-2 px-4 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-200"
              >
                Enroll Now
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200 p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-emerald-900 mb-2">30-Day Money Back Guarantee</h3>
        <p className="text-emerald-600 mb-4">
          Not satisfied? Get a full refund within 30 days, no questions asked.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-emerald-700">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />
            Secure payments
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />
            Cancel anytime
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />
            Instant access
          </div>
        </div>
      </div>

      {/* Payment Provider Selection Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h3>
            <p className="text-gray-600 mb-6">
              Select how you'd like to pay for <span className="font-semibold text-emerald-600">{selectedPlan.name}</span>
            </p>

            <div className="space-y-4">
              {/* Flutterwave - Mobile Money */}
              <button
                onClick={() => handlePaymentProvider('flutterwave')}
                className="w-full p-4 border-2 border-yellow-300 rounded-xl hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200 text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-yellow-900">Mobile Money</h4>
                    <p className="text-sm text-gray-600 mb-2">MTN MoMo, Airtel Money</p>
                    <div className="flex items-center space-x-2">
                      <div className="px-2 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded">MTN</div>
                      <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">Airtel</div>
                      <span className="text-xs text-gray-500">+ Cards</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full self-start">
                    Recommended
                  </div>
                </div>
              </button>

              {/* Stripe - Credit Card */}
              <button
                onClick={() => handlePaymentProvider('stripe')}
                className="w-full p-4 border-2 border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-900">Credit/Debit Card</h4>
                    <p className="text-sm text-gray-600 mb-2">Visa, Mastercard, Amex</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">💳 Secure international payments</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900 mb-1">100% Secure Payment</p>
                  <p>All transactions are encrypted and secured. We never store your payment details.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPricingPage;
