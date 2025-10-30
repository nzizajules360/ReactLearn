import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const trainingService = {
  // Get training statistics
  getTrainingStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/training/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching training stats:', error);
      throw error;
    }
  },

  // Get all courses with optional filtering
  getCourses: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.level) params.append('level', filters.level);
      if (filters.search) params.append('search', filters.search);
      
      const response = await axios.get(`${API_BASE_URL}/api/training/courses?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get single course by ID
  getCourse: async (courseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/training/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Get community data
  getCommunityData: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/training/community`);
      return response.data;
    } catch (error) {
      console.error('Error fetching community data:', error);
      throw error;
    }
  },

  // Get teams with optional filtering
  getTeams: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      
      const response = await axios.get(`${API_BASE_URL}/api/training/community/teams?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  },

  // Get tasks with optional filtering
  getTasks: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.teamId) params.append('teamId', filters.teamId);
      if (filters.status) params.append('status', filters.status);
      
      const response = await axios.get(`${API_BASE_URL}/api/training/community/tasks?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get leaderboard
  getLeaderboard: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/training/community/leaderboard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  },

  // Get user progress (requires authentication)
  getUserProgress: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/training/user-progress`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      throw error;
    }
  },

  // Join a team (requires authentication)
  joinTeam: async (teamId, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/training/community/join-team`, 
        { teamId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error joining team:', error);
      throw error;
    }
  },

  // Submit a task (requires authentication)
  submitTask: async (taskId, submission, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/training/community/submit-task`,
        { taskId, submission },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting task:', error);
      throw error;
    }
  },

  // Get lessons for a course
  getLessons: async (courseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/training/courses/${courseId}/lessons`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  },

  // Get single lesson
  getLesson: async (courseId, lessonId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/training/courses/${courseId}/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lesson:', error);
      throw error;
    }
  },

  // Get course progress (requires authentication)
  getCourseProgress: async (courseId, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/training/courses/${courseId}/progress`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching course progress:', error);
      throw error;
    }
  },

  // Complete a lesson (requires authentication)
  completeLesson: async (courseId, lessonId, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/training/courses/${courseId}/lessons/${lessonId}/complete`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error completing lesson:', error);
      throw error;
    }
  },

  // Submit quiz answer (requires authentication)
  submitQuiz: async (courseId, lessonId, answers, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/training/courses/${courseId}/lessons/${lessonId}/quiz`,
        { answers },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  }
};

export default trainingService;
