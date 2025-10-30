import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play,
  CheckCircle,
  Lock,
  TrendingUp,
  Microchip,
  Code,
  Zap,
  Filter,
  Search,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import trainingService from '../../../services/trainingService.js';

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    averageRating: 0,
    totalLessons: 0
  });
  
  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'iot', name: 'IoT Development', icon: Microchip },
    { id: 'tools', name: 'EcoSwarm Tools', icon: Code },
    { id: 'advanced', name: 'Advanced Topics', icon: Zap }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'Beginner', name: 'Beginner' },
    { id: 'Intermediate', name: 'Intermediate' },
    { id: 'Advanced', name: 'Advanced' }
  ];

  // Fetch courses from database
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {
        category: selectedCategory !== 'all' ? selectedCategory : null,
        level: selectedLevel !== 'all' ? selectedLevel : null,
        search: searchQuery.trim() || null
      };
      
      const coursesData = await trainingService.getCourses(filters);
      setCourses(coursesData);
      
      // Calculate stats from fetched data
      const calculatedStats = {
        totalCourses: coursesData.length,
        totalStudents: coursesData.reduce((sum, course) => sum + course.students, 0),
        averageRating: coursesData.length > 0 
          ? (coursesData.reduce((sum, course) => sum + course.rating, 0) / coursesData.length).toFixed(1)
          : 0,
        totalLessons: coursesData.reduce((sum, course) => sum + course.lessons, 0)
      };
      setStats(calculatedStats);
      
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchCourses();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCourses();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, selectedLevel, searchQuery]);

  const handleRefresh = () => {
    fetchCourses();
  };

  const CourseCard = ({ course }) => {
    const categoryInfo = categories.find(cat => cat.id === course.category);
    const CategoryIcon = categoryInfo?.icon || BookOpen;
    
    return (
      <div className="bg-white rounded-lg border border-emerald-200 overflow-hidden hover:shadow-lg transition-all duration-200">
        {/* Course Header */}
        <div className="relative">
          <div className={`h-48 bg-gradient-to-br ${
            course.category === 'iot' ? 'from-blue-400 to-cyan-500' :
            course.category === 'tools' ? 'from-purple-400 to-pink-500' :
            'from-orange-400 to-red-500'
          } flex items-center justify-center`}>
            <CategoryIcon className="w-16 h-16 text-white opacity-80" />
          </div>
          
          {course.locked && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              {course.requiresPlan === 'pro' ? 'Pro' : 'Premium'}
            </div>
          )}
          
          {course.certificate && (
            <div className="absolute top-4 left-4 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Certificate
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold">
              {course.level}
            </span>
            <div className="flex items-center text-sm text-emerald-600">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
              {course.rating}
            </div>
          </div>

          <h3 className="text-lg font-bold text-emerald-900 mb-2">{course.title}</h3>
          <p className="text-sm text-emerald-600 mb-4 line-clamp-2">{course.description}</p>

          <div className="flex items-center text-sm text-emerald-600 mb-4 space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              {course.lessons} lessons
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {course.students.toLocaleString()}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs text-emerald-600 font-semibold mb-1">Instructor:</div>
            <div className="text-sm text-emerald-900">{course.instructor}</div>
          </div>

          <div className="mb-4">
            <div className="text-xs text-emerald-600 font-semibold mb-1">Topics:</div>
            <div className="flex flex-wrap gap-1">
              {course.topics.slice(0, 3).map((topic, idx) => (
                <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs">
                  {topic}
                </span>
              ))}
              {course.topics.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{course.topics.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
            <div>
              <div className="text-2xl font-bold text-emerald-900">${course.price}</div>
              <div className="text-xs text-emerald-600">One-time payment</div>
            </div>
            
            {course.locked ? (
              <Link
                to="/training/pricing"
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-semibold text-sm flex items-center"
              >
                <Lock className="w-4 h-4 mr-1" />
                Upgrade to Unlock
              </Link>
            ) : (
              <Link
                to={`/training/course/${course.id}`}
                className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 flex items-center"
              >
                <Play className="w-4 h-4 mr-1" />
                Start Course
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <span className="ml-3 text-emerald-600">Loading courses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Courses</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-all duration-200 flex items-center mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">Course Catalog</h1>
          <p className="text-emerald-600">
            Choose from our comprehensive selection of IoT and EcoSwarm tool courses
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-white text-emerald-700 border border-emerald-200 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-all duration-200 flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Filter */}
      <div className="flex gap-2">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setSelectedLevel(level.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              selectedLevel === level.id
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            {level.name}
          </button>
        ))}
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-emerald-900">{stats.totalCourses}</div>
              <div className="text-sm text-emerald-600">Available Courses</div>
            </div>
            <BookOpen className="w-5 h-5 text-emerald-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.totalStudents.toLocaleString()}</div>
              <div className="text-sm text-blue-600">Total Students</div>
            </div>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">{stats.averageRating}</div>
              <div className="text-sm text-purple-600">Avg Rating</div>
            </div>
            <Star className="w-5 h-5 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-900">{stats.totalLessons}</div>
              <div className="text-sm text-orange-600">Total Lessons</div>
            </div>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-emerald-900 mb-2">No courses found</h3>
          <p className="text-emerald-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Upgrade CTA */}
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Unlock All Courses with Pro or Premium</h2>
        <p className="mb-6 opacity-90">
          Get unlimited access to all courses, including advanced topics and exclusive content
        </p>
        <Link
          to="/training/pricing"
          className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-all duration-200"
        >
          View Pricing Plans
        </Link>
      </div>
    </div>
  );
};

export default CoursesPage;
