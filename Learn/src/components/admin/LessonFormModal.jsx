import React, { useState } from 'react';
import { X, Plus, Save, Upload, Loader, FileText, Trash2, Video } from 'lucide-react';
import axios from 'axios';

const LessonFormModal = ({ lesson, courseId, onClose, onSave }) => {
  const [formData, setFormData] = useState(lesson || {
    courseId: parseInt(courseId),
    title: '',
    description: '',
    duration: '',
    type: 'video',
    order: 1,
    videoUrl: '',
    transcript: '',
    resources: []
  });

  const [uploading, setUploading] = useState(false);
  const [resourceForm, setResourceForm] = useState({ name: '', type: 'pdf', file: null });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 500MB for videos)
    if (file.size > 500 * 1024 * 1024) {
      alert('Video file is too large. Maximum size is 500MB.');
      return;
    }

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('type', 'video');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/admin/upload`, uploadData, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      });

      setFormData({ ...formData, videoUrl: response.data.url });
      console.log('Video uploaded successfully:', response.data.url);
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Video upload error:', error);
      alert('Failed to upload video: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleResourceUpload = async () => {
    if (!resourceForm.name || !resourceForm.file) {
      alert('Please provide resource name and file');
      return;
    }

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', resourceForm.file);
    uploadData.append('type', resourceForm.type);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/admin/upload`, uploadData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const newResource = {
        id: Date.now(),
        name: resourceForm.name,
        type: resourceForm.type,
        url: response.data.url
      };

      setFormData({
        ...formData,
        resources: [...formData.resources, newResource]
      });

      setResourceForm({ name: '', type: 'pdf', file: null });
      console.log('Resource uploaded successfully:', response.data.url);
      alert('Resource uploaded successfully!');
    } catch (error) {
      console.error('Resource upload error:', error);
      alert('Failed to upload resource: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const removeResource = (id) => {
    setFormData({
      ...formData,
      resources: formData.resources.filter(r => r.id !== id)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-900">
            {lesson ? 'Edit Lesson' : 'Add New Lesson'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">Duration *</label>
              <input
                type="text"
                required
                placeholder="e.g., 45 min"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="video">Video</option>
                <option value="reading">Reading</option>
                <option value="project">Project</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">Order *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-emerald-900 mb-2">Description *</label>
            <textarea
              required
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Video Upload */}
          {formData.type === 'video' && (
            <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 bg-emerald-50">
              <label className="block text-sm font-semibold text-emerald-900 mb-3">
                <Video className="w-5 h-5 inline mr-2" />
                Video File
              </label>
              
              {formData.videoUrl ? (
                <div className="mb-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200">
                    <div className="flex items-center">
                      <Video className="w-5 h-5 text-emerald-600 mr-2" />
                      <span className="text-sm text-emerald-900">Video uploaded</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, videoUrl: ''})}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <a 
                    href={formData.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline mt-1 block"
                  >
                    View uploaded video
                  </a>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center py-6 cursor-pointer">
                  {uploading ? (
                    <Loader className="w-8 h-8 text-emerald-600 animate-spin mb-2" />
                  ) : (
                    <Upload className="w-8 h-8 text-emerald-600 mb-2" />
                  )}
                  <span className="text-sm text-emerald-700">
                    {uploading ? 'Uploading video...' : 'Click to upload video file'}
                  </span>
                  <span className="text-xs text-emerald-600 mt-1">MP4, WebM, or OGG (max 500MB)</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              )}
              
              <div className="mt-3">
                <label className="block text-xs text-emerald-700 mb-1">Or provide video URL:</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                  placeholder="https://example.com/video.mp4"
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Transcript */}
          <div>
            <label className="block text-sm font-semibold text-emerald-900 mb-2">Transcript / Content</label>
            <textarea
              rows="5"
              value={formData.transcript}
              onChange={(e) => setFormData({...formData, transcript: e.target.value})}
              placeholder="Add lesson transcript or detailed content here..."
              className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Resources Upload */}
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50">
            <label className="block text-sm font-semibold text-emerald-900 mb-3">
              <FileText className="w-5 h-5 inline mr-2" />
              Resources (PDFs, Documents)
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
              <input
                type="text"
                value={resourceForm.name}
                onChange={(e) => setResourceForm({...resourceForm, name: e.target.value})}
                placeholder="Resource name"
                className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <select
                value={resourceForm.type}
                onChange={(e) => setResourceForm({...resourceForm, type: e.target.value})}
                className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="pdf">PDF</option>
                <option value="doc">Document</option>
                <option value="link">Link</option>
              </select>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => setResourceForm({...resourceForm, file: e.target.files[0]})}
                className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
              />
            </div>
            
            <button
              type="button"
              onClick={handleResourceUpload}
              disabled={uploading || !resourceForm.name || !resourceForm.file}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? <Loader className="w-4 h-4 mr-1 animate-spin" /> : <Upload className="w-4 h-4 mr-1" />}
              Upload Resource
            </button>

            {/* Uploaded Resources List */}
            <div className="mt-4 space-y-2">
              {formData.resources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-blue-600 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-emerald-900">{resource.name}</div>
                      <div className="text-xs text-emerald-600">{resource.type}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeResource(resource.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {lesson ? 'Update' : 'Create'} Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonFormModal;
