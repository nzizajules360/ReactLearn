import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Video, 
  MessageSquare, 
  Share2,
  Calendar,
  Clock,
  Star,
  Play,
  Plus,
  Search,
  Filter,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  FileText,
  Code,
  Lightbulb,
  Target,
  Award,
  TrendingUp,
  UserPlus,
  Send,
  Paperclip,
  Smile,
  Bell
} from 'lucide-react';

const CollaborationPage = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  const [isInSession, setIsInSession] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeSession, setActiveSession] = useState({
    id: 'session-1',
    title: 'IoT Sensor Integration Workshop',
    instructor: 'Sarah Chen',
    participants: 8,
    maxParticipants: 12,
    duration: '2 hours',
    difficulty: 'Intermediate',
    tags: ['IoT', 'Sensors', 'Arduino'],
    startTime: '2024-12-01T14:00:00Z',
    status: 'live', // 'live', 'upcoming', 'completed'
    description: 'Learn how to integrate various sensors with Arduino and send data to cloud platforms'
  });

  const [collaborationSessions] = useState([
    {
      id: 'session-1',
      title: 'IoT Sensor Integration Workshop',
      instructor: 'Sarah Chen',
      participants: 8,
      maxParticipants: 12,
      duration: '2 hours',
      difficulty: 'Intermediate',
      tags: ['IoT', 'Sensors', 'Arduino'],
      startTime: '2024-12-01T14:00:00Z',
      status: 'live',
      description: 'Learn how to integrate various sensors with Arduino and send data to cloud platforms',
      rating: 4.8,
      enrolled: true
    },
    {
      id: 'session-2',
      title: 'EcoSwarm API Deep Dive',
      instructor: 'Alex Rivera',
      participants: 15,
      maxParticipants: 20,
      duration: '1.5 hours',
      difficulty: 'Advanced',
      tags: ['API', 'Integration', 'Cloud'],
      startTime: '2024-12-02T16:00:00Z',
      status: 'upcoming',
      description: 'Advanced API integration techniques and best practices for EcoSwarm platform',
      rating: 4.9,
      enrolled: false
    },
    {
      id: 'session-3',
      title: 'Smart Home Project Collaboration',
      instructor: 'Emma Wilson',
      participants: 6,
      maxParticipants: 10,
      duration: '3 hours',
      difficulty: 'Beginner',
      tags: ['Smart Home', 'IoT', 'Project'],
      startTime: '2024-12-03T10:00:00Z',
      status: 'upcoming',
      description: 'Collaborative project building a complete smart home system',
      rating: 4.7,
      enrolled: false
    },
    {
      id: 'session-4',
      title: 'Machine Learning for IoT',
      instructor: 'Dr. Michael Kumar',
      participants: 12,
      maxParticipants: 15,
      duration: '2.5 hours',
      difficulty: 'Advanced',
      tags: ['ML', 'AI', 'IoT'],
      startTime: '2024-11-30T13:00:00Z',
      status: 'completed',
      description: 'Implement machine learning models on IoT devices for predictive analytics',
      rating: 4.9,
      enrolled: true
    }
  ]);

  const [practiceGroups] = useState([
    {
      id: 'group-1',
      name: 'Arduino Beginners',
      members: 18,
      maxMembers: 25,
      focus: 'Learning Arduino basics and simple projects',
      skillLevel: 'Beginner',
      nextMeeting: '2024-12-01T15:00:00Z',
      isActive: true,
      joined: true,
      projects: 5,
      leader: 'John Smith'
    },
    {
      id: 'group-2',
      name: 'IoT Security Team',
      members: 12,
      maxMembers: 15,
      focus: 'Security best practices for IoT deployments',
      skillLevel: 'Advanced',
      nextMeeting: '2024-12-02T17:00:00Z',
      isActive: true,
      joined: false,
      projects: 8,
      leader: 'David Park'
    },
    {
      id: 'group-3',
      name: 'Smart City Innovators',
      members: 22,
      maxMembers: 30,
      focus: 'Developing solutions for smart city challenges',
      skillLevel: 'Intermediate',
      nextMeeting: '2024-12-03T14:00:00Z',
      isActive: true,
      joined: false,
      projects: 12,
      leader: 'Lisa Thompson'
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: 'Sarah Chen',
      message: 'Welcome everyone! Let\'s start with sensor calibration.',
      timestamp: '14:00',
      isInstructor: true
    },
    {
      id: 2,
      user: 'John Doe',
      message: 'I\'m having trouble with the temperature sensor readings.',
      timestamp: '14:02',
      isInstructor: false
    },
    {
      id: 3,
      user: 'Sarah Chen',
      message: 'Check the wiring and make sure you\'re using the correct pin. I\'ll share a diagram.',
      timestamp: '14:03',
      isInstructor: true
    },
    {
      id: 4,
      user: 'Emma Wilson',
      message: 'Thanks! That helped. The readings are much more accurate now.',
      timestamp: '14:05',
      isInstructor: false
    }
  ]);

  const [sharedResources] = useState([
    {
      id: 1,
      name: 'Sensor Calibration Guide.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'Sarah Chen',
      timestamp: '14:01'
    },
    {
      id: 2,
      name: 'Arduino Code Example.ino',
      type: 'code',
      size: '12 KB',
      uploadedBy: 'Sarah Chen',
      timestamp: '14:04'
    },
    {
      id: 3,
      name: 'Wiring Diagram.png',
      type: 'image',
      size: '856 KB',
      uploadedBy: 'Sarah Chen',
      timestamp: '14:04'
    }
  ]);

  const [screenShare, setScreenShare] = useState(false);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: 'You',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isInstructor: false
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  const joinSession = (sessionId) => {
    setIsInSession(true);
    const session = collaborationSessions.find(s => s.id === sessionId);
    if (session) {
      setActiveSession(session);
    }
  };

  const leaveSession = () => {
    setIsInSession(false);
    setActiveSession(null);
  };

  const SessionCard = ({ session }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'live': return 'bg-red-100 text-red-700';
        case 'upcoming': return 'bg-blue-100 text-blue-700';
        case 'completed': return 'bg-gray-100 text-gray-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'live': return '🔴 LIVE NOW';
        case 'upcoming': return 'Upcoming';
        case 'completed': return 'Completed';
        default: return 'Unknown';
      }
    };

    const getDifficultyColor = (difficulty) => {
      switch (difficulty) {
        case 'Beginner': return 'bg-green-100 text-green-700';
        case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
        case 'Advanced': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    return (
      <div className="bg-white rounded-lg border border-emerald-200 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-bold text-emerald-900 mr-2">{session.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(session.status)}`}>
                {getStatusText(session.status)}
              </span>
            </div>
            <p className="text-sm text-emerald-600 mb-2">with {session.instructor}</p>
            <p className="text-sm text-emerald-700 line-clamp-2">{session.description}</p>
          </div>
          <div className="flex items-center ml-4">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-semibold text-emerald-900">{session.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-emerald-600 mb-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {session.participants}/{session.maxParticipants}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {session.duration}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(session.startTime).toLocaleDateString()}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {session.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs">
              {tag}
            </span>
          ))}
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(session.difficulty)}`}>
            {session.difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
          {session.enrolled ? (
            session.status === 'live' ? (
              <button
                onClick={() => joinSession(session.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-all duration-200 flex items-center"
              >
                <Play className="w-4 h-4 mr-1" />
                Join Live Session
              </button>
            ) : session.status === 'upcoming' ? (
              <button
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200"
              >
                <Calendar className="w-4 h-4 mr-1" />
                Scheduled
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold text-sm"
              >
                <Video className="w-4 h-4 mr-1" />
                View Recording
              </button>
            )
          ) : (
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200">
              <UserPlus className="w-4 h-4 mr-1" />
              Enroll Now
            </button>
          )}
        </div>
      </div>
    );
  };

  const GroupCard = ({ group }) => {
    return (
      <div className="bg-white rounded-lg border border-emerald-200 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-emerald-900 mb-1">{group.name}</h3>
            <p className="text-sm text-emerald-600">led by {group.leader}</p>
          </div>
          {group.isActive && (
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
          )}
        </div>

        <p className="text-sm text-emerald-700 mb-4">{group.focus}</p>

        <div className="flex items-center justify-between text-sm text-emerald-600 mb-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {group.members}/{group.maxMembers}
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-1" />
            {group.projects} projects
          </div>
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">
            {group.skillLevel}
          </span>
        </div>

        <div className="mb-4">
          <div className="text-xs text-emerald-600 mb-1">Next Meeting:</div>
          <div className="text-sm text-emerald-900">
            {new Date(group.nextMeeting).toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
          {group.joined ? (
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200">
              View Group
            </button>
          ) : (
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200">
              <UserPlus className="w-4 h-4 mr-1" />
              Join Group
            </button>
          )}
        </div>
      </div>
    );
  };

  if (isInSession) {
    return (
      <div className="space-y-6">
        {/* Session Header */}
        <div className="bg-white rounded-lg border border-emerald-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={leaveSession}
                className="mr-4 text-emerald-600 hover:text-emerald-700"
              >
                ← Leave Session
              </button>
              <div>
                <h2 className="text-xl font-bold text-emerald-900">{activeSession.title}</h2>
                <p className="text-sm text-emerald-600">with {activeSession.instructor}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                🔴 LIVE
              </span>
              <div className="flex items-center text-sm text-emerald-600">
                <Users className="w-4 h-4 mr-1" />
                {activeSession.participants} participants
              </div>
            </div>
          </div>
        </div>

        {/* Main Session Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Video/Screen Share */}
            <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
              {screenShare ? (
                <div className="text-white text-center">
                  <Monitor className="w-16 h-16 mx-auto mb-4" />
                  <p>Screen sharing in progress...</p>
                </div>
              ) : (
                <div className="text-white text-center">
                  <Video className="w-16 h-16 mx-auto mb-4" />
                  <p>{activeSession.instructor}'s camera</p>
                </div>
              )}
            </div>

            {/* Participant Videos */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <Users className="w-8 h-8 mx-auto mb-1" />
                    <p className="text-xs">Participant {i}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Session Controls */}
            <div className="bg-white rounded-lg border border-emerald-200 p-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isMuted ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isVideoOff ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setScreenShare(!screenShare)}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    screenShare ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                </button>
                <button className="p-3 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-all duration-200">
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={leaveSession}
                  className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-all duration-200"
                >
                  Leave Session
                </button>
              </div>
            </div>
          </div>

          {/* Chat and Resources */}
          <div className="space-y-4">
            {/* Chat */}
            <div className="bg-white rounded-lg border border-emerald-200">
              <div className="p-4 border-b border-emerald-200">
                <h3 className="font-bold text-emerald-900 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Session Chat
                </h3>
              </div>
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`text-sm ${msg.isInstructor ? 'text-emerald-900' : 'text-emerald-700'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-semibold ${msg.isInstructor ? 'text-emerald-600' : ''}`}>
                        {msg.user}
                      </span>
                      <span className="text-xs text-emerald-500">{msg.timestamp}</span>
                    </div>
                    <div className="text-emerald-700">{msg.message}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-emerald-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-emerald-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button className="p-2 text-emerald-600 hover:text-emerald-700">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-emerald-600 hover:text-emerald-700">
                    <Smile className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Shared Resources */}
            <div className="bg-white rounded-lg border border-emerald-200">
              <div className="p-4 border-b border-emerald-200">
                <h3 className="font-bold text-emerald-900 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Shared Files
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {sharedResources.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-2 bg-emerald-50 rounded">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-emerald-600 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-emerald-900">{file.name}</div>
                        <div className="text-xs text-emerald-600">{file.size} • {file.uploadedBy}</div>
                      </div>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Collaboration Hub</h1>
        <p className="text-emerald-600">
          Join live sessions, practice with others, and accelerate your learning
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-emerald-900">24</div>
              <div className="text-sm text-emerald-600">Live Sessions</div>
            </div>
            <Video className="w-5 h-5 text-emerald-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">156</div>
              <div className="text-sm text-blue-600">Active Learners</div>
            </div>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">12</div>
              <div className="text-sm text-purple-600">Practice Groups</div>
            </div>
            <Target className="w-5 h-5 text-purple-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-900">4.8</div>
              <div className="text-sm text-orange-600">Avg Rating</div>
            </div>
            <Star className="w-5 h-5 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-emerald-50 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('sessions')}
          className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
            activeTab === 'sessions'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-emerald-700 hover:text-emerald-900'
          }`}
        >
          Live Sessions
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
            activeTab === 'groups'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-emerald-700 hover:text-emerald-900'
          }`}
        >
          Practice Groups
        </button>
        <button
          onClick={() => setActiveTab('recordings')}
          className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
            activeTab === 'recordings'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-emerald-700 hover:text-emerald-900'
          }`}
        >
          Recordings
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
          <input
            type="text"
            placeholder="Search sessions or groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-3 bg-white text-emerald-700 border border-emerald-200 rounded-lg font-medium text-sm hover:bg-emerald-50 transition-all duration-200 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'sessions' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-emerald-900">Upcoming & Live Sessions</h2>
            <Link
              to="/training/pricing"
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Session
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collaborationSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-emerald-900">Practice Groups</h2>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Start Group
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'recordings' && (
        <div>
          <h2 className="text-xl font-bold text-emerald-900 mb-6">Session Recordings</h2>
          <div className="bg-white rounded-lg border border-emerald-200 p-8 text-center">
            <Video className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">No Recordings Available</h3>
            <p className="text-emerald-600">
              Recordings of completed sessions will appear here
            </p>
          </div>
        </div>
      )}

      {/* Upgrade CTA */}
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Unlock Premium Collaboration Features</h2>
        <p className="mb-6 opacity-90">
          Get unlimited access to live sessions, private groups, and expert mentoring
        </p>
        <Link
          to="/training/pricing"
          className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-all duration-200"
        >
          Upgrade to Pro/Premium
        </Link>
      </div>
    </div>
  );
};

export default CollaborationPage;
