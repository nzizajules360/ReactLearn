// src/pages/dashboard/ProfilePage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { 
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CameraIcon,
  ShieldCheckIcon,
  BellIcon,
  KeyIcon
} from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    department: '',
    bio: '',
    avatar: null
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('ecoswarm_token');
        const res = await fetch('http://localhost:3001/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load profile');
        setUserData({
          name: data.name || '',
          email: data.email || '',
          role: data.role || '',
          phone: data.profile?.phone || '',
          location: data.profile?.location || '',
          department: data.profile?.department || '',
          bio: data.profile?.bio || '',
          avatar: data.profile?.avatarUrl || null
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchProfile();
  }, [isAuthenticated]);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('ecoswarm_token');
      const res = await fetch('http://localhost:3001/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: userData.name,
          profile: {
            phone: userData.phone,
            location: userData.location,
            department: userData.department,
            bio: userData.bio
          }
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');
      setMessage('Profile updated successfully');
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-200">
        <div className="flex items-center space-x-6">
          <div className="relative">
            {userData.avatar ? (
              <img src={userData.avatar} alt="Avatar" className="w-24 h-24 rounded-2xl object-cover border border-emerald-200" />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {(userData.name || 'U').slice(0, 2).toUpperCase()}
              </div>
            )}
            <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-lime-600 transition-colors">
              <CameraIcon className="w-5 h-5" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setSaving(true); setError(''); setMessage('')
              try {
                const token = localStorage.getItem('ecoswarm_token')
                const form = new FormData()
                form.append('avatar', file)
                const res = await fetch('http://localhost:3001/api/profile/avatar', {
                  method: 'POST',
                  headers: { Authorization: `Bearer ${token}` },
                  body: form
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.message || 'Upload failed')
                setUserData(prev => ({ ...prev, avatar: data.avatarUrl }))
                setMessage('Avatar updated')
              } catch (e) {
                setError(e.message)
              } finally {
                setSaving(false)
                e.target.value = ''
              }
            }} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-emerald-900">{userData.name || 'Your Name'}</h1>
            <p className="text-emerald-700 text-lg">{userData.role} {userData.department ? `• ${userData.department}` : ''}</p>
            <p className="text-emerald-600 mt-2">{userData.bio}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-emerald-200 overflow-hidden">
        {(error || message) && (
          <div className="px-8 pt-4">
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
            {message && <div className="mb-4 p-3 bg-lime-50 border border-lime-200 rounded-xl text-lime-700 text-sm">{message}</div>}
          </div>
        )}
        {/* Tabs */}
        <div className="border-b border-emerald-200">
          <div className="flex space-x-8 px-8">
            {[
              { id: 'profile', name: 'Profile', icon: UserCircleIcon },
              { id: 'security', name: 'Security', icon: ShieldCheckIcon },
              { id: 'notifications', name: 'Notifications', icon: BellIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-lime-500 text-emerald-900'
                      : 'border-transparent text-emerald-600 hover:text-emerald-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {loading && <div className="text-emerald-700">Loading profile...</div>}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 pl-12 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <PhoneIcon className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 pl-12 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPinIcon className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={userData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 pl-12 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">
                  Bio
                </label>
                <textarea
                  value={userData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white resize-none"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button className="px-6 py-3 border-2 border-emerald-200 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="px-6 py-3 bg-gradient-to-r from-lime-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-emerald-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <KeyIcon className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="password"
                        className="w-full px-4 py-3 pl-12 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none transition-all duration-200 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-3 bg-gradient-to-r from-lime-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-emerald-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Email notifications', description: 'Receive updates via email', enabled: true },
                  { label: 'Push notifications', description: 'Receive browser notifications', enabled: true },
                  { label: 'SMS alerts', description: 'Receive text message alerts', enabled: false },
                  { label: 'Weekly reports', description: 'Get weekly sustainability reports', enabled: true },
                  { label: 'Project updates', description: 'Notifications about project changes', enabled: true }
                ].map((pref, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div>
                      <div className="font-semibold text-emerald-900">{pref.label}</div>
                      <div className="text-sm text-emerald-600">{pref.description}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={pref.enabled} />
                      <div className="w-11 h-6 bg-emerald-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-emerald-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;