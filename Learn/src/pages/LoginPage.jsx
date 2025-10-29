import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    department: '',
    bio: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const backgroundImages = [
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }

    if (isSignUp) {
      if (!formData.name) {
        setError('Please enter your full name');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
      // Optional fields, no strict validation beyond presence if filled
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
      const payload = isSignUp 
        ? { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password,
            location: formData.location,
            department: formData.department,
            bio: formData.bio
          }
        : { email: formData.email, password: formData.password };

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (isSignUp) {
        setSuccess('Account created successfully! Please login.');
        setIsSignUp(false);
        setFormData({ name: '', email: '', password: '', confirmPassword: '', location: '', department: '', bio: '' });
      } else {
        // Login successful
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role || 'user'
        };
        
        login(userData, data.token);
        setSuccess('Login successful! Redirecting...');
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address to reset password');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      setSuccess('Password reset instructions sent to your email');
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-lime-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side - Login Form */}
        <div className="p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-2xl flex items-center justify-center transform rotate-12">
                <Sprout className="w-10 h-10 text-white transform -rotate-12" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2 text-emerald-900">
              {isSignUp ? 'Join EcoSwarm' : 'Welcome to EcoSwarm'}
            </h1>
            <p className="text-emerald-700 text-center">
              {isSignUp ? 'Create your account and start making a difference' : 'Login to continue your eco-journey'}
            </p>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-lime-50 border border-lime-200 rounded-xl text-lime-700 text-sm">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 pl-4 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            {/* Location & Department (Sign Up Only) */}
            {isSignUp && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="w-full px-4 py-3 pl-4 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Department
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="Environmental Operations"
                      className="w-full px-4 py-3 pl-4 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 pl-12 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-12 pr-12 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500 hover:text-lime-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pl-12 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            {/* Bio (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Tell us a bit about your sustainability journey..."
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-green-50/50 resize-none"
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Remember Me & Forgot Password (Login Only) */}
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-lime-600 border-emerald-300 rounded focus:ring-lime-500 cursor-pointer"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-emerald-700 group-hover:text-emerald-900">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-lime-600 hover:text-lime-700 font-semibold disabled:opacity-50"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Terms Agreement (Sign Up Only) */}
            {isSignUp && (
              <label className="flex items-start space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-lime-600 border-emerald-300 rounded focus:ring-lime-500 mt-1 cursor-pointer"
                  disabled={isLoading}
                />
                <span className="text-sm text-emerald-700 group-hover:text-emerald-900">
                  I agree to the{' '}
                  <a href="#" className="text-lime-600 hover:text-lime-700 font-semibold">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-lime-600 hover:text-lime-700 font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isSignUp ? 'Creating Account...' : 'Logging in...'}
                </>
              ) : (
                isSignUp ? 'Join the Swarm' : 'Login to EcoSwarm'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-emerald-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-emerald-600 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                className="flex items-center justify-center space-x-2 border-2 border-emerald-200 py-3 rounded-xl hover:border-lime-500 hover:bg-lime-50 hover:shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-semibold text-emerald-700">Google</span>
              </button>

              <button 
                type="button"
                className="flex items-center justify-center space-x-2 border-2 border-emerald-200 py-3 rounded-xl hover:border-lime-500 hover:bg-lime-50 hover:shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-semibold text-emerald-700">Facebook</span>
              </button>
            </div>

            {/* Toggle Between Login and Sign Up */}
            <div className="text-center pt-4">
              {isSignUp ? (
                <p className="text-emerald-700">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-lime-600 hover:text-lime-700 font-bold hover:underline disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Login here
                  </button>
                </p>
              ) : (
                <p className="text-emerald-700">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-lime-600 hover:text-lime-700 font-bold hover:underline disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Join the Swarm
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Right Side - Image Carousel */}
        <div className="hidden lg:block relative bg-gradient-to-br from-emerald-800 to-green-700">
          <div className="absolute inset-0 overflow-hidden">
            {backgroundImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`EcoSwarm Background ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-emerald-900/40 mix-blend-multiply"></div>
              </div>
            ))}
          </div>

          {/* Carousel Content Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-12 text-center">
            <div className="max-w-md">
              <SparklesIcon className="w-16 h-16 text-lime-300 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Join the Eco Revolution
              </h2>
              <p className="text-lg text-green-100 mb-8 leading-relaxed">
                Be part of the movement that's transforming technology for a sustainable future. Together we can make a difference.
              </p>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-3 mt-8">
                {backgroundImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImage 
                        ? 'bg-lime-400 w-8' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-2xl font-bold text-lime-300">10K+</div>
                  <div className="text-sm text-green-200">Eco Warriors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-lime-300">50+</div>
                  <div className="text-sm text-green-200">Green Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-lime-300">99%</div>
                  <div className="text-sm text-green-200">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="col-span-1 lg:col-span-2 bg-emerald-50 px-8 py-4 text-center border-t border-emerald-100">
          <p className="text-sm text-emerald-700">
            Secured by <span className="font-semibold text-lime-600">EcoSwarm</span> • Protecting our planet together
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;