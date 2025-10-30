import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  ArrowLeft, 
  Shield, 
  User,
  Mail,
  Phone,
  Zap,
  Crown,
  Rocket,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import PaymentMethodSelector from '../../../components/payment/PaymentMethodSelector';

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: user?.name || '',
    phone: ''
  });
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(searchParams.get('provider') || 'flutterwave');
  
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

  const handlePaymentSuccess = async (response) => {
    console.log('Payment successful:', response);
    
    // Save enrollment to backend
    try {
      const token = localStorage.getItem('token');
      const enrollmentData = {
        courseId: course || plan,
        amount: price,
        transactionId: response.transaction_id || response.id,
        paymentMethod: response.payment_method || 'card',
        billingCycle: isSubscription ? billingCycle : 'one-time'
      };
      
      await fetch('http://localhost:3001/api/training/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(enrollmentData)
      });
      
      alert('Payment successful! You now have access to the course.');
      navigate('/training/courses');
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Payment successful but enrollment failed. Please contact support.');
    }
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.fullName) {
      alert('Please fill in your email and full name');
      return;
    }
    
    setShowPayment(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
          <p className="text-emerald-600">Pay with Mobile Money (MTN/Airtel) or Credit Card (Stripe)</p>
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
            {!showPayment ? (
              <form onSubmit={handleContinueToPayment} className="space-y-6">
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
                      className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
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
                      className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-900 mb-2">
                      Phone Number (Optional - for Mobile Money)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="+250 7XX XXX XXX"
                    />
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center shadow-lg"
              >
                <Shield className="w-5 h-5 mr-2" />
                Continue to Payment
              </button>
            </form>
            ) : (
              <div className="bg-white rounded-lg border border-emerald-200 p-6">
                <button
                  onClick={() => setShowPayment(false)}
                  className="mb-4 text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Information
                </button>
                <PaymentMethodSelector
                  course={selectedItem}
                  amount={price}
                  userEmail={formData.email}
                  userName={formData.fullName}
                  phoneNumber={formData.phone}
                  onSuccess={handlePaymentSuccess}
                  onClose={() => setShowPayment(false)}
                  initialProvider={selectedProvider}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
