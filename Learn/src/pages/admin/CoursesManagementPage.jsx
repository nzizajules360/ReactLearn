import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, BookOpen, Video, FileText, Save, X, Check, AlertCircle } from 'lucide-react';
import axios from 'axios';
import CourseFormModal from '../../components/admin/CourseFormModal.jsx';
import LessonFormModal from '../../components/admin/LessonFormModal.jsx';

const CoursesManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      fetchLessons(selectedCourseId);
    }
  }, [selectedCourseId]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/training/courses`);
      setCourses(response.data);
    } catch (error) {
      showMessage('error', 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/api/training/courses/${courseId}/lessons`);
      setLessons(response.data);
    } catch (error) {
      showMessage('error', 'Failed to fetch lessons');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const saveCourse = async (courseData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('error', 'No authentication token found. Please login again.');
        return;
      }

      const url = editingCourse 
        ? `${API_URL}/api/admin/courses/${editingCourse.id}`
        : `${API_URL}/api/admin/courses`;
      
      console.log('Saving course to:', url);
      console.log('Course data:', courseData);
      
      const response = await axios[editingCourse ? 'put' : 'post'](url, courseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Course saved successfully:', response.data);
      showMessage('success', `Course ${editingCourse ? 'updated' : 'created'} successfully`);
      fetchCourses();
      setShowCourseModal(false);
      setEditingCourse(null);
    } catch (error) {
      console.error('Error saving course:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      showMessage('error', `Failed to ${editingCourse ? 'update' : 'create'} course: ${errorMsg}`);
    }
  };

  const saveLesson = async (lessonData) => {
    try {
      const token = localStorage.getItem('token');
      const url = editingLesson
        ? `${API_URL}/api/admin/courses/${selectedCourseId}/lessons/${editingLesson.id}`
        : `${API_URL}/api/admin/courses/${selectedCourseId}/lessons`;
      
      await axios[editingLesson ? 'put' : 'post'](url, lessonData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      showMessage('success', `Lesson ${editingLesson ? 'updated' : 'created'} successfully`);
      fetchLessons(selectedCourseId);
      setShowLessonModal(false);
      setEditingLesson(null);
    } catch (error) {
      showMessage('error', `Failed to ${editingLesson ? 'update' : 'create'} lesson`);
    }
  };

  const deleteCourse = async (courseId) => {
    if (!confirm('Delete this course and all its lessons?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/admin/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage('success', 'Course deleted');
      fetchCourses();
      if (selectedCourseId === courseId) {
        setSelectedCourseId(null);
        setLessons([]);
      }
    } catch (error) {
      showMessage('error', 'Failed to delete course');
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!confirm('Delete this lesson?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/admin/courses/${selectedCourseId}/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage('success', 'Lesson deleted');
      fetchLessons(selectedCourseId);
    } catch (error) {
      showMessage('error', 'Failed to delete lesson');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-900">Course Management</h1>
        <button
          onClick={() => {
            setEditingCourse(null);
            setShowCourseModal(true);
          }}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg flex items-center ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.type === 'success' ? <Check className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Courses List */}
        <div className="bg-white rounded-lg border border-emerald-200 p-6">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">Courses ({courses.length})</h2>
          
          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCourseId === course.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-emerald-200 hover:bg-emerald-50'
                }`}
                onClick={() => setSelectedCourseId(course.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-emerald-900">{course.title}</h3>
                    <p className="text-sm text-emerald-600 mt-1">{course.instructor}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{course.level}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">{course.category}</span>
                      <span className="text-xs text-emerald-600">${course.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCourse(course);
                        setShowCourseModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCourse(course.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lessons List */}
        <div className="bg-white rounded-lg border border-emerald-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-emerald-900">
              Lessons {selectedCourseId && `(${lessons.length})`}
            </h2>
            {selectedCourseId && (
              <button
                onClick={() => {
                  setEditingLesson(null);
                  setShowLessonModal(true);
                }}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Lesson
              </button>
            )}
          </div>

          {!selectedCourseId ? (
            <div className="text-center py-12 text-emerald-600">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a course to view its lessons</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="p-4 border border-emerald-200 rounded-lg hover:bg-emerald-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-emerald-700">#{lesson.order}</span>
                        <h3 className="font-semibold text-emerald-900">{lesson.title}</h3>
                      </div>
                      <p className="text-sm text-emerald-600 mt-1">{lesson.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">{lesson.type}</span>
                        <span className="text-xs text-emerald-600">{lesson.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingLesson(lesson);
                          setShowLessonModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteLesson(lesson.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Course Form Modal */}
      {showCourseModal && (
        <CourseFormModal
          course={editingCourse}
          onClose={() => {
            setShowCourseModal(false);
            setEditingCourse(null);
          }}
          onSave={saveCourse}
        />
      )}

      {/* Lesson Form Modal */}
      {showLessonModal && selectedCourseId && (
        <LessonFormModal
          lesson={editingLesson}
          courseId={selectedCourseId}
          onClose={() => {
            setShowLessonModal(false);
            setEditingLesson(null);
          }}
          onSave={saveLesson}
        />
      )}
    </div>
  );
};

export default CoursesManagementPage;
