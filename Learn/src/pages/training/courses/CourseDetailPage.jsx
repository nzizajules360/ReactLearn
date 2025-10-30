import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  CheckCircle,
  Lock,
  FileText,
  Code,
  Video,
  Award,
  TrendingUp,
  Calendar,
  Download,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import trainingService from '../../../services/trainingService.js';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch course details
      const courseData = await trainingService.getCourse(courseId);
      setCourse(courseData);
      
      // Fetch lessons for this course
      const lessonsData = await trainingService.getLessons(courseId);
      setLessons(lessonsData);
      
      // Fetch user progress (if authenticated)
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const progressData = await trainingService.getCourseProgress(courseId, token);
          setProgress(progressData);
        } catch (progressErr) {
          // Ignore auth errors for progress - user can still view course
          if (progressErr.response?.status !== 401) {
            console.error('Failed to fetch progress:', progressErr);
          }
        }
      }
      
    } catch (err) {
      console.error('Failed to fetch course data:', err);
      setError('Failed to load course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (!progress || lessons.length === 0) return 0;
    return (progress.completedLessons.length / lessons.length) * 100;
  };

  const LessonCard = ({ lesson }) => {
    const isCompleted = progress?.completedLessons.includes(lesson.id);
    const isCurrent = progress?.currentLesson === lesson.id;
    
    return (
      <div className={`bg-white rounded-lg border p-4 hover:shadow-md transition-all duration-200 ${
        isCompleted ? 'border-emerald-300 bg-emerald-50' : 
        isCurrent ? 'border-blue-300 bg-blue-50' : 
        'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isCompleted ? 'bg-emerald-500 text-white' :
              isCurrent ? 'bg-blue-500 text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              {isCompleted ? <CheckCircle className="w-5 h-5" /> :
               isCurrent ? <Play className="w-4 h-4" /> :
               <Lock className="w-4 h-4" />}
            </div>
            
            <div>
              <h3 className="font-semibold text-emerald-900">{lesson.title}</h3>
              <p className="text-sm text-emerald-600">{lesson.description}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-emerald-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {lesson.duration}
                </span>
                <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                  {lesson.type}
                </span>
              </div>
            </div>
          </div>
          
          <Link
            to={`/training/course/${courseId}/lesson/${lesson.id}`}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              isCompleted ? 'bg-emerald-500 text-white hover:bg-emerald-600' :
              isCurrent ? 'bg-blue-500 text-white hover:bg-blue-600' :
              lesson.isLocked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
              'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            }`}
          >
            {isCompleted ? 'Review' : isCurrent ? 'Continue' : lesson.isLocked ? 'Locked' : 'Start'}
          </Link>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        <span className="ml-3 text-emerald-600">Loading course...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Course</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchCourseData}
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-all duration-200 flex items-center mx-auto"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-emerald-900 mb-2">Course Not Found</h3>
        <p className="text-emerald-600">The course you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Link to="/training/courses" className="text-emerald-200 hover:text-white mr-2">
                ← Back to Courses
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-emerald-100 mb-4">{course.description}</p>
            
            <div className="flex items-center space-x-6 text-sm">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {course.duration}
              </span>
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {course.lessons} lessons
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {course.students.toLocaleString()} students
              </span>
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {course.rating}
              </span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">${course.price}</div>
            <div className="text-sm text-emerald-200 mb-4">One-time payment</div>
            {course.certificate && (
              <div className="flex items-center justify-center text-sm">
                <Award className="w-4 h-4 mr-1" />
                Certificate included
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      {progress && (
        <div className="bg-white rounded-lg border border-emerald-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-emerald-900">Your Progress</h2>
            <span className="text-2xl font-bold text-emerald-600">{Math.round(calculateProgress())}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-900">{progress.completedLessons.length}</div>
              <div className="text-sm text-emerald-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{lessons.length - progress.completedLessons.length}</div>
              <div className="text-sm text-blue-600">Remaining</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900">{Math.round(progress.timeSpent / 60)}h</div>
              <div className="text-sm text-purple-600">Time Spent</div>
            </div>
          </div>
        </div>
      )}

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lessons List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-emerald-200 p-6">
            <h2 className="text-xl font-bold text-emerald-900 mb-6">Course Content</h2>
            
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Info */}
          <div className="bg-white rounded-lg border border-emerald-200 p-6">
            <h3 className="font-bold text-emerald-900 mb-4">Course Information</h3>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm text-emerald-600 font-semibold">Instructor</div>
                <div className="text-emerald-900">{course.instructor}</div>
              </div>
              
              <div>
                <div className="text-sm text-emerald-600 font-semibold">Level</div>
                <div className="text-emerald-900">{course.level}</div>
              </div>
              
              <div>
                <div className="text-sm text-emerald-600 font-semibold">Category</div>
                <div className="text-emerald-900">{course.category}</div>
              </div>
              
              <div>
                <div className="text-sm text-emerald-600 font-semibold">Last Updated</div>
                <div className="text-emerald-900">{new Date(course.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="bg-white rounded-lg border border-emerald-200 p-6">
            <h3 className="font-bold text-emerald-900 mb-4">What You'll Learn</h3>
            
            <ul className="space-y-2">
              {course.learningObjectives?.map((objective, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-emerald-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg border border-emerald-200 p-6">
            <h3 className="font-bold text-emerald-900 mb-4">Requirements</h3>
            
            <div className="space-y-3">
              {course.requirements?.prerequisites?.length > 0 && (
                <div>
                  <div className="text-sm text-emerald-600 font-semibold mb-1">Prerequisites</div>
                  <ul className="space-y-1">
                    {course.requirements.prerequisites.map((prereq, idx) => (
                      <li key={idx} className="text-sm text-emerald-700">• {prereq}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {course.requirements?.materials?.length > 0 && (
                <div>
                  <div className="text-sm text-emerald-600 font-semibold mb-1">Materials</div>
                  <ul className="space-y-1">
                    {course.requirements.materials.map((material, idx) => (
                      <li key={idx} className="text-sm text-emerald-700">• {material}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Certificate */}
          {course.certificate && (
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200 p-6 text-center">
              <Award className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-emerald-900 mb-2">Certificate of Completion</h3>
              <p className="text-sm text-emerald-600 mb-4">
                Earn a verified certificate when you complete all lessons
              </p>
              {progress?.certificateEarned && (
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200">
                  <Download className="w-4 h-4 mr-2 inline" />
                  Download Certificate
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
