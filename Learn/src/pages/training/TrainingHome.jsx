import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trainingService from '../../services/trainingService.js';
import Navbar from '../../components/Navbar';
import { 
  BookOpen, 
  Users, 
  CreditCard, 
  Code,
  Microchip,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

const TrainingHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  const fetchStats = async () => {
    try {
      const data = await trainingService.getTrainingStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const features = [
    {
      icon: BookOpen,
      title: 'IoT Courses',
      description: 'Learn about IoT devices, sensors, and smart systems',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Microchip,
      title: 'Tool Training',
      description: 'Master the tools used in EcoSwarm ecosystem',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Collaborate with teams and complete real-world tasks',
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Code,
      title: 'Practice Workspace',
      description: 'Hands-on coding and device simulation',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const statsDisplay = stats ? [
    { label: 'Active Students', value: stats.overview?.activeStudents?.toLocaleString() || '0', icon: TrendingUp },
    { label: 'Courses Available', value: stats.overview?.totalCourses || '0', icon: BookOpen },
    { label: 'Community Teams', value: stats.overview?.communityTeams || '0', icon: Users },
    { label: 'Success Rate', value: `${stats.overview?.successRate || 0}%`, icon: CheckCircle }
  ] : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Hero Section */}
          <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-2xl mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-emerald-900 mb-4">
          Welcome to EcoSwarm Training
        </h1>
        <p className="text-xl text-emerald-700 max-w-3xl mx-auto mb-8">
          Master IoT development, learn essential tools, and collaborate with a community of innovators. 
          Choose your learning path and start building the future today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/training/courses"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Learning
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link
            to="/training/pricing"
            className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 font-semibold rounded-lg border-2 border-emerald-200 hover:bg-emerald-50 transition-all duration-200"
          >
            View Plans
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsDisplay.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-lg border border-emerald-100">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-emerald-600" />
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold text-emerald-900">{stat.value}</div>
              <div className="text-sm text-emerald-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={index}
              to={index === 0 ? '/training/courses' : index === 2 ? '/training/community' : '/training/workspace'}
              className="group block p-6 bg-white rounded-lg border border-emerald-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-emerald-900 mb-2 group-hover:text-emerald-700">
                    {feature.title}
                  </h3>
                  <p className="text-emerald-600 mb-3">{feature.description}</p>
                  <div className="flex items-center text-emerald-600 font-medium text-sm group-hover:text-emerald-700">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pricing Preview */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">Choose Your Plan</h2>
          <p className="text-emerald-600">Unlock premium features and accelerate your learning</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">Free</h3>
            <p className="text-3xl font-bold text-emerald-900 mb-4">$0<span className="text-sm text-emerald-600">/month</span></p>
            <ul className="space-y-2 text-sm text-emerald-700">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />Basic courses</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />Community access</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />Limited workspace</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg p-6 text-white relative transform scale-105 shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              POPULAR
            </div>
            <h3 className="text-lg font-semibold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-4">$19<span className="text-sm opacity-90">/month</span></p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />All courses for 1 month</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />AI assistant</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Full workspace access</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">Premium</h3>
            <p className="text-3xl font-bold text-emerald-900 mb-4">$49<span className="text-sm text-emerald-600">/month</span></p>
            <ul className="space-y-2 text-sm text-emerald-700">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />All courses forever</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />Advanced AI features</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />Priority support</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <Link
            to="/training/pricing"
            className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 font-semibold rounded-lg border-2 border-emerald-200 hover:bg-emerald-50 transition-all duration-200"
          >
            View All Plans
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
        </div>
      </div>
    </>
  );
};

export default TrainingHome;
