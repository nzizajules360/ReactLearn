import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause,
  SkipForward,
  SkipBack,
  CheckCircle,
  BookOpen,
  FileText,
  Code,
  Download,
  ArrowRight,
  ArrowLeft,
  Award,
  AlertCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import trainingService from '../../../services/trainingService.js';

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  useEffect(() => {
    fetchLessonData();
  }, [courseId, lessonId]);

  const fetchLessonData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const courseData = await trainingService.getCourse(courseId);
      setCourse(courseData);
      
      const lessonsData = await trainingService.getLessons(courseId);
      setLessons(lessonsData);
      
      const lessonData = await trainingService.getLesson(courseId, lessonId);
      setLesson(lessonData);
      
      // Check if lesson is already completed
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const progress = await trainingService.getCourseProgress(courseId, token);
          setLessonCompleted(progress?.completedLessons?.includes(parseInt(lessonId)));
        } catch (progressErr) {
          // Ignore auth errors - user can still view lesson without progress tracking
          if (progressErr.response?.status !== 401) {
            console.error('Failed to fetch progress:', progressErr);
          }
        }
      }
      
    } catch (err) {
      console.error('Failed to fetch lesson data:', err);
      setError('Failed to load lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteLesson = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to track your progress');
        return;
      }
      
      await trainingService.completeLesson(courseId, lessonId, token);
      setLessonCompleted(true);
      
      // Move to next lesson if available
      const currentIndex = lessons.findIndex(l => l.id === parseInt(lessonId));
      if (currentIndex < lessons.length - 1) {
        const nextLesson = lessons[currentIndex + 1];
        setTimeout(() => {
          navigate(`/training/course/${courseId}/lesson/${nextLesson.id}`);
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to complete lesson:', err);
    }
  };

  const handleQuizSubmit = () => {
    if (!lesson?.quiz) return;
    
    let correct = 0;
    lesson.quiz.questions.forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    const score = (correct / lesson.quiz.questions.length) * 100;
    setQuizScore(score);
    setQuizSubmitted(true);
    
    if (score >= 70) {
      handleCompleteLesson();
    }
  };

  const getCurrentLessonIndex = () => {
    return lessons.findIndex(l => l.id === parseInt(lessonId));
  };

  const getPreviousLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    return currentIndex > 0 ? lessons[currentIndex - 1] : null;
  };

  const getNextLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        <span className="ml-3 text-emerald-600">Loading lesson...</span>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Lesson</h3>
        <p className="text-red-600 mb-4">{error || 'Lesson not found'}</p>
        <button
          onClick={fetchLessonData}
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-all duration-200 flex items-center mx-auto"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-emerald-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <Link 
            to={`/training/course/${courseId}`}
            className="text-emerald-600 hover:text-emerald-700 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Course
          </Link>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-emerald-600">
              Lesson {getCurrentLessonIndex() + 1} of {lessons.length}
            </span>
            {lessonCompleted && (
              <span className="flex items-center text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </span>
            )}
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-emerald-900 mb-2">{lesson.title}</h1>
        <p className="text-emerald-600">{lesson.description}</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          {lesson.type === 'video' && lesson.content?.video && (
            <div className="bg-black rounded-lg overflow-hidden aspect-video">
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-sm">Video Player</p>
                  <p className="text-xs opacity-60 mt-1">Duration: {lesson.duration}</p>
                </div>
              </div>
            </div>
          )}

          {/* Code Examples */}
          {lesson.content?.code && lesson.content.code.length > 0 && (
            <div className="bg-white rounded-lg border border-emerald-200 p-6">
              <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Code Examples
              </h2>
              
              {lesson.content.code.map((codeBlock, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-emerald-900">{codeBlock.title}</h3>
                    <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                      {codeBlock.language}
                    </span>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{codeBlock.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Project Requirements */}
          {lesson.type === 'project' && lesson.content?.project && (
            <div className="bg-white rounded-lg border border-emerald-200 p-6">
              <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Project Requirements
              </h2>
              
              <p className="text-emerald-700 mb-4">{lesson.content.project.description}</p>
              
              <h3 className="font-semibold text-emerald-900 mb-2">Requirements:</h3>
              <ul className="space-y-2 mb-6">
                {lesson.content.project.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-emerald-700">{req}</span>
                  </li>
                ))}
              </ul>
              
              {lesson.content.project.starterCode && (
                <div>
                  <h3 className="font-semibold text-emerald-900 mb-2">Starter Code:</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{lesson.content.project.starterCode.code}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Transcript */}
          {lesson.content?.transcript && (
            <div className="bg-white rounded-lg border border-emerald-200 p-6">
              <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Transcript
              </h2>
              <p className="text-emerald-700 whitespace-pre-wrap">{lesson.content.transcript}</p>
            </div>
          )}

          {/* Quiz */}
          {lesson.quiz && (
            <div className="bg-white rounded-lg border border-emerald-200 p-6">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">Lesson Quiz</h2>
              
              {!quizSubmitted ? (
                <div className="space-y-6">
                  {lesson.quiz.questions.map((question, qIdx) => (
                    <div key={question.id} className="border-b border-emerald-100 pb-4">
                      <p className="font-semibold text-emerald-900 mb-3">
                        {qIdx + 1}. {question.question}
                      </p>
                      
                      <div className="space-y-2">
                        {question.options.map((option, oIdx) => (
                          <label key={oIdx} className="flex items-center p-3 border border-emerald-200 rounded-lg cursor-pointer hover:bg-emerald-50">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={oIdx}
                              checked={quizAnswers[question.id] === oIdx}
                              onChange={() => setQuizAnswers({...quizAnswers, [question.id]: oIdx})}
                              className="mr-3"
                            />
                            <span className="text-emerald-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length !== lesson.quiz.questions.length}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Quiz
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    quizScore >= 70 ? 'bg-emerald-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-3xl font-bold ${
                      quizScore >= 70 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {Math.round(quizScore)}%
                    </span>
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${
                    quizScore >= 70 ? 'text-emerald-900' : 'text-red-900'
                  }`}>
                    {quizScore >= 70 ? 'Great Job!' : 'Keep Practicing'}
                  </h3>
                  
                  <p className={`mb-4 ${
                    quizScore >= 70 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {quizScore >= 70 
                      ? 'You passed the quiz! Lesson marked as complete.' 
                      : 'You need 70% to pass. Review the material and try again.'}
                  </p>
                  
                  {quizScore < 70 && (
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                      }}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600"
                    >
                      Retry Quiz
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Complete Lesson Button */}
          {!lessonCompleted && !lesson.quiz && (
            <button
              onClick={handleCompleteLesson}
              className="w-full px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-200 flex items-center justify-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark as Complete
            </button>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {getPreviousLesson() ? (
              <Link
                to={`/training/course/${courseId}/lesson/${getPreviousLesson().id}`}
                className="px-4 py-2 bg-white text-emerald-700 border border-emerald-200 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-200 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Link>
            ) : (
              <div></div>
            )}
            
            {getNextLesson() ? (
              <Link
                to={`/training/course/${courseId}/lesson/${getNextLesson().id}`}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-200 flex items-center"
              >
                Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            ) : (
              <Link
                to={`/training/course/${courseId}`}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-200 flex items-center"
              >
                Back to Course
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Resources */}
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="bg-white rounded-lg border border-emerald-200 p-6">
              <h3 className="font-bold text-emerald-900 mb-4 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Resources
              </h3>
              
              <div className="space-y-2">
                {lesson.resources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-emerald-600 mr-2" />
                      <span className="text-sm text-emerald-900">{resource.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-emerald-600" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Course Progress */}
          <div className="bg-white rounded-lg border border-emerald-200 p-6">
            <h3 className="font-bold text-emerald-900 mb-4">Course Progress</h3>
            
            <div className="space-y-2">
              {lessons.map((l, idx) => (
                <Link
                  key={l.id}
                  to={`/training/course/${courseId}/lesson/${l.id}`}
                  className={`flex items-center p-2 rounded-lg transition-colors ${
                    l.id === parseInt(lessonId) 
                      ? 'bg-emerald-100 text-emerald-900' 
                      : 'hover:bg-gray-50 text-emerald-700'
                  }`}
                >
                  <span className="text-sm mr-2">{idx + 1}.</span>
                  <span className="text-sm flex-1">{l.title}</span>
                  {l.isCompleted && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
