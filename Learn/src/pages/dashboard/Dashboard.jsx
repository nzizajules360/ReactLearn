import React, { useEffect, useState } from 'react';
import { 

  BoltIcon, 
  UsersIcon,

  CogIcon,
  BellIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
 
  DocumentChartBarIcon
} from '@heroicons/react/24/solid';
import { Sprout } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GrassBlurCard from '../../components/GrassBlurCard';
import NotificationsPermission from '../../components/NotificationsPermission';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [iotMessages, setIotMessages] = useState([]);
  const [iotConnected, setIotConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('ecoswarm_token');
        const res = await fetch('http://localhost:3001/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load dashboard');
        setDashboardData(data);
      } catch (e) {
        setError(e.message);
      }
    };
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const token = localStorage.getItem('ecoswarm_token');
    const url = `http://localhost:3001/api/iot/stream?token=${encodeURIComponent(token)}`;
    const es = new EventSource(url);
    es.addEventListener('open', () => setIotConnected(true));
    es.addEventListener('hello', () => setIotConnected(true));
    es.addEventListener('error', () => setIotConnected(false));
    es.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        setIotMessages((prev) => [msg, ...prev].slice(0, 50));
      } catch {}
    };
    return () => {
      es.close();
      setIotConnected(false);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const token = localStorage.getItem('ecoswarm_token');
    // initial load
    fetch('http://localhost:3001/api/notifications', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then((list) => setNotifications(Array.isArray(list) ? list : []))
      .catch(() => {});

    // SSE with auto-retry
    let es;
    let retryMs = 1000;
    const connect = () => {
      es = new EventSource(`http://localhost:3001/api/notifications/stream?token=${encodeURIComponent(token)}`);
      es.onopen = () => { retryMs = 1000; };
      es.onmessage = (evt) => {
        try {
          const n = JSON.parse(evt.data);
          setNotifications(prev => [n, ...prev].slice(0, 100));
        } catch {}
      };
      es.onerror = () => {
        es.close();
        setTimeout(connect, retryMs);
        retryMs = Math.min(retryMs * 2, 30000);
      };
    };
    connect();
    return () => es && es.close();
  }, [isAuthenticated]);

  const markAllNotificationsRead = async () => {
    const token = localStorage.getItem('ecoswarm_token');
    const unread = notifications.filter(n => !n.is_read);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: 1 })));
    // fire-and-forget requests
    unread.slice(0, 20).forEach((n) => {
      fetch(`http://localhost:3001/api/notifications/${n.id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <div className="bg-white border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-900">EcoSwarm Dashboard</h1>
                <p className="text-emerald-700">Welcome back to your dashboard!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button onClick={() => { const next = !notifOpen; setNotifOpen(next); if (next) markAllNotificationsRead(); }} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors relative">
                  <BellIcon className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-lime-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">{unreadCount > 9 ? '9+' : unreadCount}</span>
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 sm:w-96 w-[90vw] max-w-sm bg-white border border-emerald-200 rounded-xl shadow-lg z-10 max-h-96 overflow-auto">
                    <div className="p-3 border-b border-emerald-100 flex items-center justify-between">
                      <div className="font-semibold text-emerald-900">Notifications</div>
                      <button onClick={() => setNotifOpen(false)} className="text-emerald-700 text-sm hover:underline">Close</button>
                    </div>
                    <div className="divide-y divide-emerald-100">
                      {notifications.length === 0 ? (
                        <div className="p-3 text-sm text-emerald-700">No notifications</div>
                      ) : notifications.map((n) => (
                        <div key={n.id} className={`p-3 ${n.is_read ? '' : 'bg-emerald-50'} hover:bg-emerald-50`}>
                          <div className="text-emerald-900 font-medium text-sm">{n.title}</div>
                          <div className="text-emerald-700 text-sm">{n.body}</div>
                          <div className="text-emerald-500 text-xs mt-1">{new Date(n.created_at).toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link to="/dashboard/settings" className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                <CogIcon className="w-6 h-6" />
              </Link>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="px-3 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Logout
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                ECS
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-200 p-2 mb-8">
          <div className="flex space-x-2">
            {['overview', 'analytics', 'projects', 'reports', 'team'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-lime-500 to-emerald-600 text-white shadow-lg'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Permission Prompt */}
        <NotificationsPermission />

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-4">{error}</div>
        )}

        {/* Loading */}
        {!dashboardData && !error && (
          <div className="text-emerald-700">Loading dashboard...</div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Overview Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-6">
              {dashboardData?.metrics?.map((metric, index) => (
                <GrassBlurCard key={index}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-emerald-900">{metric.name}</h3>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-emerald-900">{metric.value}</p>
                      <p className={`text-sm ${metric.change > 0 ? 'text-lime-700' : 'text-emerald-700'}`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}% from last month
                      </p>
                    </div>
                  </div>
                </GrassBlurCard>
              ))}
            </div>

            {/* Carbon Reduction Progress */}
            <GrassBlurCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-emerald-900">Monthly Carbon Reduction Goal</h2>
                <span className="text-emerald-700 font-semibold">{dashboardData?.overview?.monthlyGoal}% Complete</span>
              </div>
              <div className="w-full bg-emerald-100 rounded-full h-4 mb-4">
                <div 
                  className="bg-gradient-to-r from-lime-400 to-emerald-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${dashboardData?.overview?.monthlyGoal || 0}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-900">{dashboardData?.overview?.carbonReduction}%</div>
                  <div className="text-sm text-emerald-600">Carbon Reduced</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-900">{dashboardData?.overview?.energySaved}%</div>
                  <div className="text-sm text-emerald-600">Energy Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-900">{dashboardData?.overview?.projectsActive}</div>
                  <div className="text-sm text-emerald-600">Active Projects</div>
                </div>
              </div>
            </GrassBlurCard>

            {/* Recent Projects */}
            <GrassBlurCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-emerald-900">Active Projects</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {dashboardData?.projects?.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex-1">
                      <h4 className="font-semibold text-emerald-900">{project.name}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-emerald-700 flex items-center">
                          <UsersIcon className="w-4 h-4 mr-1" />
                          {project.members} members
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-900">{project.progress}%</div>
                      <div className="w-24 bg-emerald-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
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
            </GrassBlurCard>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* IoT Live Feed */}
            <GrassBlurCard>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-emerald-900">IoT Live Feed</h2>
                <span className={`text-sm font-medium ${iotConnected ? 'text-lime-600' : 'text-amber-600'}`}>
                  {iotConnected ? 'Connected' : 'Connecting...'}
                </span>
              </div>
              <div className="space-y-3 max-h-64 overflow-auto">
                {iotMessages.length === 0 ? (
                  <div className="text-emerald-600 text-sm">No messages yet</div>
                ) : (
                  iotMessages.map((m, idx) => (
                    <div key={idx} className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <div className="text-emerald-900 text-sm font-semibold">{m.topic || 'sensor'}</div>
                      <pre className="text-emerald-700 text-xs whitespace-pre-wrap break-words">{JSON.stringify(m.payload, null, 2)}</pre>
                      <div className="text-emerald-500 text-xs mt-1">{m.created_at || ''}</div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-end mt-3">
                <button onClick={() => setIotMessages([])} className="text-emerald-700 text-sm hover:underline">Clear</button>
              </div>
            </GrassBlurCard>
            {/* Quick Actions */}
            <GrassBlurCard>
              <h2 className="text-xl font-bold text-emerald-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-lime-50 border border-lime-200 rounded-xl hover:bg-lime-100 transition-colors group">
                  <DocumentChartBarIcon className="w-6 h-6 text-lime-600" />
                  <span className="font-semibold text-emerald-900">Generate Report</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors group">
                  <Sprout className="w-6 h-6 text-emerald-600" />
                  <span className="font-semibold text-emerald-900">Offset Carbon</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors group">
                  <BoltIcon className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-emerald-900">Track Energy</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 transition-colors group">
                  <UsersIcon className="w-6 h-6 text-teal-600" />
                  <span className="font-semibold text-emerald-900">Manage Team</span>
                </button>
              </div>
            </GrassBlurCard>

            {/* Recent Activity */}
            <GrassBlurCard>
              <h2 className="text-xl font-bold text-emerald-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {dashboardData?.recentActivities?.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      activity.type === 'success' ? 'bg-lime-500' :
                      activity.type === 'warning' ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-emerald-900 font-medium">{activity.action}</p>
                      <p className="text-sm text-emerald-600">{activity.project}</p>
                      <p className="text-xs text-emerald-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GrassBlurCard>

            {/* Environmental Impact */}
            <div className="bg-gradient-to-br from-emerald-700 to-green-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Your Environmental Impact</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Carbon Offset</span>
                  <span className="font-bold">12.5 tCO₂e</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Trees Equivalent</span>
                  <span className="font-bold">285 trees</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Energy Saved</span>
                  <span className="font-bold">8.2 MWh</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-green-500">
                <div className="text-center">
                  <div className="text-2xl font-bold text-lime-300">45%</div>
                  <div className="text-green-200 text-sm">Towards Annual Goal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-emerald-800 to-green-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Help with Your Sustainability Goals?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Our eco-experts are here to help you optimize your environmental impact and achieve your sustainability targets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-lime-400 text-emerald-900 px-6 py-3 rounded-xl font-bold hover:bg-lime-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Schedule Consultation
            </button>
            <button className="bg-white/10 backdrop-blur-sm border-2 border-lime-300/50 text-white px-6 py-3 rounded-xl font-bold hover:bg-lime-400/20 transition-all duration-300">
              View Analytics Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;