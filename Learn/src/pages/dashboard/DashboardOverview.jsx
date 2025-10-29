// src/pages/dashboard/DashboardOverview.jsx
import React, { useState } from 'react';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  UsersIcon,
  CalendarIcon,
  DocumentChartBarIcon,
  EyeIcon,
  BoltIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/solid';
import { Sprout } from 'lucide-react';

function DashboardOverview() {
  const [timeRange, setTimeRange] = useState('monthly');

  // Mock data for the dashboard
  const dashboardData = {
    overview: {
      carbonReduction: 15.2,
      energySaved: 45.8,
      projectsActive: 12,
      teamMembers: 8,
      weeklyTrend: 'up',
      monthlyGoal: 75,
      carbonOffset: '12.5 tCO₂e',
      treesEquivalent: 285
    },
    metrics: [
      { 
        name: 'Carbon Emissions', 
        value: '45.2 tCO₂e', 
        change: -15.2, 
        trend: 'down', 
        color: 'emerald',
        icon:  Sprout
      },
      { 
        name: 'Energy Consumption', 
        value: '12.8 MWh', 
        change: -8.5, 
        trend: 'down', 
        color: 'green',
        icon: BoltIcon
      },
      { 
        name: 'Waste Reduction', 
        value: '28%', 
        change: 12.3, 
        trend: 'up', 
        color: 'lime',
        icon: ChartBarIcon
      },
      { 
        name: 'Water Usage', 
        value: '45 m³', 
        change: -5.7, 
        trend: 'down', 
        color: 'teal',
        icon: EyeIcon
      }
    ],
    recentActivities: [
      { 
        action: 'Carbon offset purchased', 
        project: 'Reforestation Brazil', 
        date: '2 hours ago', 
        type: 'success',
        icon: CheckCircleIcon
      },
      { 
        action: 'Energy report generated', 
        project: 'Monthly Analytics', 
        date: '5 hours ago', 
        type: 'info',
        icon: DocumentChartBarIcon
      },
      { 
        action: 'New team member added', 
        project: 'Sustainability Team', 
        date: '1 day ago', 
        type: 'success',
        icon: UsersIcon
      },
      { 
        action: 'Carbon threshold alert', 
        project: 'Manufacturing Plant', 
        date: '2 days ago', 
        type: 'warning',
        icon: ExclamationTriangleIcon
      }
    ],
    projects: [
      { 
        name: 'Office Energy Efficiency', 
        progress: 85, 
        status: 'on-track', 
        members: 5,
        deadline: '2024-03-15',
        description: 'Reduce office energy consumption by 25%'
      },
      { 
        name: 'Supply Chain Optimization', 
        progress: 60, 
        status: 'needs-attention', 
        members: 8,
        deadline: '2024-04-20',
        description: 'Optimize supply chain for carbon reduction'
      },
      { 
        name: 'Renewable Energy Transition', 
        progress: 45, 
        status: 'at-risk', 
        members: 12,
        deadline: '2024-06-30',
        description: 'Transition to 100% renewable energy sources'
      },
      { 
        name: 'Waste Management Program', 
        progress: 95, 
        status: 'completed', 
        members: 6,
        deadline: '2024-02-28',
        description: 'Implement comprehensive waste management'
      }
    ],
    environmentalImpact: [
      { metric: 'Carbon Offset', value: '12.5 tCO₂e', equivalent: '285 trees planted' },
      { metric: 'Energy Saved', value: '8.2 MWh', equivalent: '6 homes powered for 1 month' },
      { metric: 'Water Conserved', value: '15,000 L', equivalent: '100 showers saved' },
      { metric: 'Waste Diverted', value: '2.8 tons', equivalent: '4 cars off the road' }
    ]
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' 
      ? <ArrowTrendingUpIcon className="w-4 h-4 text-lime-500" />
      : <ArrowTrendingDownIcon className="w-4 h-4 text-emerald-500" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      'on-track': 'bg-lime-100 text-lime-800 border-lime-300',
      'needs-attention': 'bg-amber-100 text-amber-800 border-amber-300',
      'at-risk': 'bg-red-100 text-red-800 border-red-300',
      'completed': 'bg-emerald-100 text-emerald-800 border-emerald-300'
    };
    return colors[status] || colors['on-track'];
  };

  const getStatusIcon = (status) => {
    const icons = {
      'on-track': <CheckCircleIcon className="w-4 h-4" />,
      'needs-attention': <ExclamationTriangleIcon className="w-4 h-4" />,
      'at-risk': <ExclamationTriangleIcon className="w-4 h-4" />,
      'completed': <CheckCircleIcon className="w-4 h-4" />
    };
    return icons[status];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Dashboard Overview</h1>
          <p className="text-emerald-700 mt-1">Welcome back! Here's your sustainability performance.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white rounded-xl p-1 border border-emerald-200">
          {['weekly', 'monthly', 'quarterly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                timeRange === range
                  ? 'bg-gradient-to-r from-lime-500 to-emerald-600 text-white shadow-md'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Great progress this month! 🌱</h1>
          <p className="text-green-100 text-lg">
            You've reduced carbon emissions by {dashboardData.overview.carbonReduction}% and saved {dashboardData.overview.energySaved}% energy. 
            Keep up the excellent work!
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-200 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">{metric.name}</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-emerald-900">{metric.value}</p>
                  <p className={`text-sm font-medium ${metric.change > 0 ? 'text-lime-600' : 'text-emerald-600'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}% from last month
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Progress and Projects */}
        <div className="lg:col-span-2 space-y-8">
          {/* Carbon Reduction Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-emerald-900">Monthly Carbon Reduction Goal</h2>
              <span className="text-emerald-700 font-semibold">{dashboardData.overview.monthlyGoal}% Complete</span>
            </div>
            <div className="w-full bg-emerald-100 rounded-full h-4 mb-6">
              <div 
                className="bg-gradient-to-r from-lime-400 to-emerald-600 h-4 rounded-full transition-all duration-1000 shadow-inner"
                style={{ width: `${dashboardData.overview.monthlyGoal}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-lime-50 rounded-xl p-4 border border-lime-200">
                <div className="text-2xl font-bold text-emerald-900">{dashboardData.overview.carbonReduction}%</div>
                <div className="text-sm text-emerald-600">Carbon Reduced</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="text-2xl font-bold text-emerald-900">{dashboardData.overview.energySaved}%</div>
                <div className="text-sm text-emerald-600">Energy Saved</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-900">{dashboardData.overview.projectsActive}</div>
                <div className="text-sm text-emerald-600">Active Projects</div>
              </div>
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                <div className="text-2xl font-bold text-emerald-900">{dashboardData.overview.teamMembers}</div>
                <div className="text-sm text-emerald-600">Team Members</div>
              </div>
            </div>
          </div>

          {/* Active Projects */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-emerald-900">Active Projects</h2>
              <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center space-x-1">
                <span>View All</span>
                <ArrowTrendingUpIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {dashboardData.projects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200 hover:border-lime-300 transition-all duration-200 group">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-emerald-900 group-hover:text-emerald-800">{project.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                        <span>{project.status.replace('-', ' ')}</span>
                      </span>
                    </div>
                    <p className="text-sm text-emerald-600 mb-2">{project.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-emerald-700">
                      <span className="flex items-center space-x-1">
                        <UsersIcon className="w-4 h-4" />
                        <span>{project.members} members</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>Due {formatDate(project.deadline)}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-emerald-900">{project.progress}%</div>
                    <div className="w-24 bg-emerald-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          project.status === 'completed' 
                            ? 'bg-emerald-600' 
                            : project.status === 'at-risk'
                            ? 'bg-red-500'
                            : project.status === 'needs-attention'
                            ? 'bg-amber-500'
                            : 'bg-lime-500'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Environmental Impact */}
          <div className="bg-gradient-to-br from-emerald-700 to-green-600 rounded-2xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Stroup className="w-5 h-5 text-lime-300" />
              <span>Environmental Impact</span>
            </h2>
            <div className="space-y-4">
              {dashboardData.environmentalImpact.map((impact, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-green-100 font-medium">{impact.metric}</span>
                    <span className="font-bold text-lime-300">{impact.value}</span>
                  </div>
                  <div className="text-xs text-green-200">{impact.equivalent}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-green-500 text-center">
              <div className="text-2xl font-bold text-lime-300">45%</div>
              <div className="text-green-200 text-sm">Towards Annual Sustainability Goal</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-200">
            <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center space-x-2">
              <ClockIcon className="w-5 h-5 text-emerald-600" />
              <span>Recent Activity</span>
            </h2>
            <div className="space-y-4">
              {dashboardData.recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      activity.type === 'success' ? 'bg-lime-100 text-lime-600' :
                      activity.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-emerald-900 font-medium group-hover:text-emerald-800">{activity.action}</p>
                      <p className="text-sm text-emerald-600 truncate">{activity.project}</p>
                      <p className="text-xs text-emerald-500">{activity.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-200">
            <h2 className="text-xl font-bold text-emerald-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-lime-50 border border-lime-200 rounded-xl hover:bg-lime-100 transition-all duration-200 group hover:border-lime-300">
                <DocumentChartBarIcon className="w-5 h-5 text-lime-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-emerald-900">Generate Report</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-all duration-200 group hover:border-emerald-300">
                <Stroup className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-emerald-900">Offset Carbon</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-all duration-200 group hover:border-green-300">
                <BoltIcon className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-emerald-900">Track Energy</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 transition-all duration-200 group hover:border-teal-300">
                <UsersIcon className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-emerald-900">Manage Team</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Need Help Achieving Your Goals?</h2>
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">
          Our sustainability experts are ready to help you optimize your environmental impact and reach your targets faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-lime-400 text-emerald-900 px-6 py-3 rounded-xl font-bold hover:bg-lime-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Schedule Expert Consultation
          </button>
          <button className="bg-white/10 backdrop-blur-sm border-2 border-lime-300/50 text-white px-6 py-3 rounded-xl font-bold hover:bg-lime-400/20 transition-all duration-300">
            Download Resources
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;