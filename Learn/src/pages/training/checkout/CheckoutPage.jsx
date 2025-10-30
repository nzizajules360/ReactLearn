import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  CheckCircle, 
  ArrowLeft, 
  Shield, 
  Lock,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Zap,
  Crown,
  Rocket,
  BookOpen
} from 'lucide-react';

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  const plan = searchParams.get('plan');
  const course = searchParams.get('course');

  const plans = {
    pro: {
      name: 'Pro',
      description: 'All courses for 1 month',
      price: { monthly: 19, yearly: 190 },
      icon: Rocket,
      color: 'from-emerald-500 to-green-600',
      features: [
        'Access to ALL courses for 1 month',
        'AI assistant integration',
        'Advanced workspace with IoT simulation',
        'Real-time collaboration',
        'Priority email support'
      ]
    },
    premium: {
      name: 'Premium',
      description: 'Lifetime access to all courses',
      price: { monthly: 49, yearly: 490 },
      icon: Crown,
      color: 'from-purple-500 to-pink-600',
      features: [
        'Lifetime access to ALL courses',
        'Advanced AI assistant with custom tasks',
        'Unlimited IoT device simulation',
        'Premium collaboration tools',
        '24/7 priority support'
      ]
    },
    'community-basic': {
      name: 'Community Basic',
      description: 'Join and participate in teams',
      price: { monthly: 9, yearly: 90 },
      icon: User,
      color: 'from-blue-500 to-cyan-600',
      features: [
        'Join up to 3 teams',
        'Complete team tasks',
        'Basic task management',
        'Team chat access',
        'Monthly progress reports'
      ]
    },
    'community-plus': {
      name: 'Community Plus',
      description: 'Lead teams and manage projects',
      price: { monthly: 29, yearly: 290 },
      icon: Crown,
      color: 'from-orange-500 to-red-600',
      features: [
        'Lead up to 5 teams',
        'Create and assign tasks',
        'Advanced team analytics',
        'Custom team workflows',
        'Team performance tracking'
      ]
    }
  };

  const courses = {
    'iot-fundamentals': {
      name: 'IoT Fundamentals',
      description: 'Learn the basics of IoT, sensors, and smart device development',
      price: 29,
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      type: 'course'
    },
    'advanced-iot-systems': {
      name: 'Advanced IoT Systems',
      description: 'Build complex IoT systems with edge computing and ML',
      price: 49,
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      type: 'course'
    },
    'ecoswarm-tools-mastery': {
      name: 'EcoSwarm Tools Mastery',
      description: 'Master all tools and features of the EcoSwarm ecosystem',
      price: 39,
      icon: BookOpen,
      color: 'from-emerald-500 to-green-500',
      type: 'course'
    }
  };

  const selectedPlan = plan ? plans[plan] : null;
  const selectedCourse = course ? courses[course] : null;
  const selectedItem = selectedPlan || selectedCourse;

  useEffect(() => {
    if (!selectedItem) {
      navigate('/training/pricing');
    }
  }, [selectedItem, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
      newErrors.cardNumber = 'Card number must be 16 digits';
    
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
      newErrors.expiryDate = 'Use MM/YY format';
    
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(formData.cvv))
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    
    if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // In a real app, this would handle actual payment processing
      alert('Payment successful! Redirecting to your courses...');
      navigate('/training/courses');
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  if (!selectedItem) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-emerald-600">Loading...</div>
    </div>;
  }

  const ItemIcon = selectedItem.icon;
  const price = selectedItem.price ? selectedItem.price[billingCycle] : selectedItem.price;
  const isSubscription = selectedItem.type !== 'course';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </button>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">Complete Your Purchase</h1>
          <p className="text-emerald-600">Secure checkout powered by Stripe</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-emerald-200 p-6 sticky top-8">
              <h2 className="text-lg font-bold text-emerald-900 mb-4">Order Summary</h2>
              
              <div className={`p-4 bg-gradient-to-br ${selectedItem.color} rounded-lg text-white mb-4`}>
                <div className="flex items-center mb-3">
                  <ItemIcon className="w-8 h-8 mr-3" />
                  <div>
                    <h3 className="font-bold">{selectedItem.name}</h3>
                    <p className="text-sm opacity-90">{selectedItem.description}</p>
                  </div>
                </div>
              </div>

              {isSubscription && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-emerald-900 mb-2">
                    Billing Cycle
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        billingCycle === 'monthly'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        billingCycle === 'yearly'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      Yearly (Save 17%)
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-4">
                {selectedItem.features?.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-start text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-emerald-700">{feature}</span>
                  </div>
                ))}
                {selectedItem.features && selectedItem.features.length > 3 && (
                  <div className="text-sm text-emerald-600">
                    +{selectedItem.features.length - 3} more features
                  </div>
                )}
              </div>

              <div className="border-t border-emerald-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-600">Subtotal</span>
                  <span className="font-semibold text-emerald-900">${price}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-600">Tax</span>
                  <span className="font-semibold text-emerald-900">$0.00</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-emerald-200">
                  <span className="text-lg font-bold text-emerald-900">Total</span>
                  <span className="text-2xl font-bold text-emerald-900">
                    ${price}
                    {isSubscription && <span className="text-sm font-normal text-emerald-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Shield className="w-4 h-4 text-emerald-600 mr-2" />
                  <span className="text-sm font-semibold text-emerald-900">30-Day Money Back Guarantee</span>
                </div>
                <p className="text-xs text-emerald-600">
                  Not satisfied? Get a full refund within 30 days.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg border border-emerald-200 p-6">
                <h3 className="text-lg font-bold text-emerald-900 mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-emerald-200'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.fullName ? 'border-red-500' : 'border-emerald-200'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-emerald-200'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg border border-emerald-200 p-6">
                <h3 className="text-lg font-bold text-emerald-900 mb-4">Payment Information</h3>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-emerald-900">
                      Card Number
                    </label>
                    <div className="flex items-center text-xs text-emerald-600">
                      <Lock className="w-3 h-3 mr-1" />
                      Secured by Stripe
                    </div>
                  </div>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      cardNumber: formatCardNumber(e.target.value) 
                    }))}
                    maxLength={19}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      errors.cardNumber ? 'border-red-500' : 'border-emerald-200'
                    }`}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-900 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        expiryDate: formatExpiryDate(e.target.value) 
                      }))}
                      maxLength={5}
                      placeholder="MM/YY"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.expiryDate ? 'border-red-500' : 'border-emerald-200'
                      }`}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-900 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.cvv ? 'border-red-500' : 'border-emerald-200'
                      }`}
                      placeholder="123"
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-emerald-900 mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      errors.cardName ? 'border-red-500' : 'border-emerald-200'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.cardName && (
                    <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 mr-3"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-emerald-700">
                    I agree to the Terms of Service and Privacy Policy. I understand that 
                    {isSubscription ? ' this subscription will automatically renew and can be cancelled at any time.' : ' this is a one-time purchase for lifetime access to the course.'}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Complete Purchase - ${price}
                    {isSubscription && <span className="text-sm">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>}
                  </>
                )}
              </button>

              {/* Security Notice */}
              <div className="text-center text-sm text-emerald-600">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-4 h-4 mr-1" />
                  Your payment information is encrypted and secure
                </div>
                <p>We never store your credit card details</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
