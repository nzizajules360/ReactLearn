import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trainingService from '../../../services/trainingService.js';
import { 
  Users, 
  Plus, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Star,
  Trophy,
  Target,
  MessageSquare,
  UserPlus,
  Award,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('teams');
  const [searchQuery, setSearchQuery] = useState('');
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  
  useEffect(() => {
    fetchCommunityData();
  }, []);
  
  const fetchCommunityData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const communityData = await trainingService.getCommunityData();
      setTeams(communityData.teams || []);
      setTasks(communityData.tasks || []);
      setLeaderboard(communityData.leaderboard || []);
      
      const token = localStorage.getItem('token');
      if (token) {
        const progress = await trainingService.getUserProgress(token);
        setUserProgress(progress);
      }
      
    } catch (err) {
      console.error('Failed to fetch community data:', err);
      setError('Failed to load community data');
    } finally {
      setLoading(false);
    }
  };
  
  // Use user progress from API or default values
  const currentUser = userProgress || {
    name: 'Guest User',
    role: 'member',
    teams: [],
    completedTasks: 0,
    points: 0
  };

  const TeamCard = ({ team }) => {
    const progressPercentage = (team.currentProgress / team.weeklyGoal) * 100;
    
    return (
      <div className="bg-white rounded-lg border border-emerald-200 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-900">{team.name}</h3>
              <p className="text-sm text-emerald-600">led by {team.leader}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            team.joinStatus === 'joined' ? 'bg-emerald-100 text-emerald-700' :
            team.joinStatus === 'available' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-600'
          }`}>
            {team.joinStatus === 'joined' ? 'Joined' :
             team.joinStatus === 'available' ? 'Available' : 'Full'}
          </span>
        </div>

        <p className="text-sm text-emerald-700 mb-4">{team.description}</p>

        <div className="flex items-center justify-between text-sm text-emerald-600 mb-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {team.members}/{team.maxMembers} members
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-1" />
            {team.tasksCompleted} tasks
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-emerald-600">Weekly Progress</span>
            <span className="font-semibold text-emerald-900">
              {team.currentProgress}/{team.weeklyGoal}
            </span>
          </div>
          <div className="w-full bg-emerald-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {team.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
          <div className="text-sm">
            <span className="text-emerald-600">Difficulty: </span>
            <span className="font-semibold text-emerald-900">{team.difficulty}</span>
          </div>
          
          {team.joinStatus === 'joined' ? (
            <Link
              to={`/training/community/team/${team.id}`}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200"
            >
              View Team
            </Link>
          ) : team.joinStatus === 'available' ? (
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold text-sm hover:bg-blue-600 transition-all duration-200 flex items-center">
              <UserPlus className="w-4 h-4 mr-1" />
              Join Team
            </button>
          ) : (
            <button disabled className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold text-sm cursor-not-allowed">
              Team Full
            </button>
          )}
        </div>
      </div>
    );
  };

  const TaskCard = ({ task }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'submitted': return 'bg-blue-100 text-blue-700';
        case 'completed': return 'bg-emerald-100 text-emerald-700';
        case 'in-progress': return 'bg-yellow-100 text-yellow-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'submitted': return 'Submitted';
        case 'completed': return 'Completed';
        case 'in-progress': return 'In Progress';
        default: return 'Not Started';
      }
    };

    return (
      <div className="bg-white rounded-lg border border-emerald-200 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-emerald-900 mb-1">{task.title}</h3>
            <p className="text-sm text-emerald-600 mb-2">{task.teamName}</p>
            <p className="text-sm text-emerald-700">{task.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-900">{task.points}</div>
            <div className="text-xs text-emerald-600">points</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-emerald-600 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(task.deadline).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {task.submissions}/{task.maxSubmissions} submitted
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-semibold text-emerald-900 mb-2">Requirements:</div>
          <ul className="space-y-1">
            {task.requirements.slice(0, 2).map((req, idx) => (
              <li key={idx} className="text-xs text-emerald-600 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" />
                {req}
              </li>
            ))}
            {task.requirements.length > 2 && (
              <li className="text-xs text-emerald-600">
                +{task.requirements.length - 2} more requirements
              </li>
            )}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.userStatus)}`}>
            {getStatusText(task.userStatus)}
          </span>
          
          <Link
            to={`/training/community/task/${task.id}`}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200"
          >
            View Task
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Community Learning</h1>
        <p className="text-emerald-600">
          Join teams, complete tasks, and collaborate with other learners
        </p>
      </div>

      {/* User Stats */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mr-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-900">{currentUser.name}</h3>
              <p className="text-sm text-emerald-600">Community Member</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-900">{currentUser.points}</div>
              <div className="text-sm text-emerald-600">Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-900">{currentUser.completedTasks}</div>
              <div className="text-sm text-emerald-600">Tasks Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-900">{currentUser.teams.length}</div>
              <div className="text-sm text-emerald-600">Teams Joined</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-emerald-50 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('teams')}
          className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
            activeTab === 'teams'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-emerald-700 hover:text-emerald-900'
          }`}
        >
          My Teams
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
            activeTab === 'tasks'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-emerald-700 hover:text-emerald-900'
          }`}
        >
          Available Tasks
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
            activeTab === 'leaderboard'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-emerald-700 hover:text-emerald-900'
          }`}
        >
          Leaderboard
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
        <input
          type="text"
          placeholder="Search teams or tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Content based on active tab */}
      {activeTab === 'teams' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-emerald-900">Available Teams</h2>
            <Link
              to="/training/pricing"
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Team
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-emerald-900">Active Tasks</h2>
            <div className="text-sm text-emerald-600">
              Complete tasks to earn points and climb the leaderboard
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div>
          <h2 className="text-xl font-bold text-emerald-900 mb-6">Community Leaderboard</h2>
          
          <div className="bg-white rounded-lg border border-emerald-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-emerald-50 font-semibold text-sm text-emerald-900">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Member</div>
              <div className="col-span-2">Points</div>
              <div className="col-span-2">Tasks</div>
              <div className="col-span-3">Team</div>
            </div>
            
            {leaderboard.map((member) => (
              <div key={member.rank} className="grid grid-cols-12 gap-4 p-4 border-t border-emerald-100 hover:bg-emerald-50 transition-colors">
                <div className="col-span-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    member.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    member.rank === 2 ? 'bg-gray-100 text-gray-700' :
                    member.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {member.rank}
                  </div>
                </div>
                <div className="col-span-4 font-medium text-emerald-900">{member.name}</div>
                <div className="col-span-2 font-semibold text-emerald-900">{member.points.toLocaleString()}</div>
                <div className="col-span-2 text-emerald-600">{member.tasksCompleted}</div>
                <div className="col-span-3 text-emerald-600">{member.team}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
