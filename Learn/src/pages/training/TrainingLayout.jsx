import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { 
  BookOpen, 
  Users, 
  CreditCard, 
  GraduationCap,
  Sparkles,
  Code,
  Microchip,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

const TrainingLayout = () => {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: 'Courses',
      href: '/training/courses',
      icon: BookOpen,
      description: 'Access IoT and tool training courses'
    },
    {
      name: 'Community',
      href: '/training/community',
      icon: Users,
      description: 'Join teams and complete tasks'
    },
    {
      name: 'Pricing',
      href: '/training/pricing',
      icon: CreditCard,
      description: 'Premium, Pro, and course plans'
    },
    {
      name: 'Workspace',
      href: '/training/workspace',
      icon: Code,
      description: 'Practice with IoT devices and code'
    },
    {
      name: 'Collaboration',
      href: '/training/collaboration',
      icon: MessageSquare,
      description: 'Collaborate with others'
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/training" className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-emerald-900">EcoSwarm Training</h1>
                    <p className="text-xs text-emerald-600">Learn, Collaborate, Build</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-900 shadow-sm'
                        : 'text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-emerald-600' : 'text-emerald-500 group-hover:text-emerald-600'}`} />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-emerald-600 mt-0.5">{item.description}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-emerald-600' : 'text-emerald-400 group-hover:text-emerald-600'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* AI Assistant Preview */}
            <div className="mt-8 p-4 bg-gradient-to-br from-emerald-100 to-lime-100 rounded-lg border border-emerald-200">
              <div className="flex items-center mb-3">
                <Sparkles className="w-5 h-5 text-emerald-600 mr-2" />
                <h3 className="font-semibold text-emerald-900">AI Assistant</h3>
              </div>
              <p className="text-sm text-emerald-700 mb-3">
                Get help with courses, tasks, and coding. Available for Premium and Pro users.
              </p>
              <div className="text-xs text-emerald-600">
                Click the AI button in the bottom right to get started
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <Outlet />
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default TrainingLayout;
