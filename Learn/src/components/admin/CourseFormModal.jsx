import React, { useState } from 'react';
import { X, Plus, Save, Check, Upload, Loader } from 'lucide-react';
import axios from 'axios';

const CourseFormModal = ({ course, onClose, onSave }) => {
  const [formData, setFormData] = useState(course || {
    title: '',
    description: '',
    category: 'iot',
    level: 'Beginner',
    duration: '',
    price: 0,
    instructor: '',
    topics: [],
    learningObjectives: [],
    requirements: {
      prerequisites: [],
      materials: []
    },
    certificate: true,
    thumbnail: ''
  });
  
  const [inputs, setInputs] = useState({
    topic: '',
    objective: '',
    prerequisite: '',
    material: ''
  });
  
  const [uploading, setUploading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(course?.thumbnail || '');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('type', 'thumbnail');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/admin/upload`, formDataUpload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const fileUrl = response.data.url;
      setFormData({ ...formData, [fieldName]: fileUrl });
      setThumbnailPreview(fileUrl);
      console.log('File uploaded successfully:', fileUrl);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const addItem = (field, inputKey) => {
    const value = inputs[inputKey].trim();
    if (!value) return;

    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: [...formData[parent][child], value]
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], value]
      });
    }
    setInputs({ ...inputs, [inputKey]: '' });
  };

  const removeItem = (index, field) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: formData[parent][child].filter((_, i) => i !== index)
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: formData[field].filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-900">
            {course ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-semibold text-emerald-900 mb-2">
              Course Thumbnail
            </label>
            <div className="flex items-center gap-4">
              {thumbnailPreview && (
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail" 
                  className="w-32 h-32 object-cover rounded-lg border-2 border-emerald-200"
                />
              )}
              <div className="flex-1">
                <label className="flex items-center justify-center px-4 py-2 bg-emerald-500 text-white rounded-lg cursor-pointer hover:bg-emerald-600">
                  {uploading ? <Loader className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5 mr-2" />}
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'thumbnail')}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <p className="text-xs text-emerald-600 mt-1">Recommended: 800x600px, JPG or PNG</p>
              </div>
            </div>
          </div>

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
              <label className="block text-sm font-semibold text-emerald-900 mb-2">Instructor *</label>
              <input
                type="text"
                required
                value={formData.instructor}
                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="iot">IoT Development</option>
                <option value="tools">EcoSwarm Tools</option>
                <option value="advanced">Advanced Topics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">Level *</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">Duration *</label>
              <input
                type="text"
                required
                placeholder="e.g., 6 weeks"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">Price ($) *</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
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

          {/* Topics */}
          <div>
            <label className="block text-sm font-semibold text-emerald-900 mb-2">Topics</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={inputs.topic}
                onChange={(e) => setInputs({...inputs, topic: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('topics', 'topic'))}
                placeholder="Add a topic"
                className="flex-1 px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => addItem('topics', 'topic')}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.topics.map((topic, index) => (
                <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center">
                  {topic}
                  <button
                    type="button"
                    onClick={() => removeItem(index, 'topics')}
                    className="ml-2 text-emerald-600 hover:text-emerald-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Learning Objectives */}
          <div>
            <label className="block text-sm font-semibold text-emerald-900 mb-2">Learning Objectives</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={inputs.objective}
                onChange={(e) => setInputs({...inputs, objective: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('learningObjectives', 'objective'))}
                placeholder="Add a learning objective"
                className="flex-1 px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => addItem('learningObjectives', 'objective')}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-1">
              {formData.learningObjectives.map((obj, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-emerald-700">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="flex-1">{obj}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(index, 'learningObjectives')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          <div>
            <label className="block text-sm font-semibold text-emerald-900 mb-2">Prerequisites</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={inputs.prerequisite}
                onChange={(e) => setInputs({...inputs, prerequisite: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('requirements.prerequisites', 'prerequisite'))}
                placeholder="Add a prerequisite"
                className="flex-1 px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => addItem('requirements.prerequisites', 'prerequisite')}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-1">
              {formData.requirements.prerequisites.map((prereq, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-emerald-700">
                  <span className="flex-1">• {prereq}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(index, 'requirements.prerequisites')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <label className="block text-sm font-semibold text-emerald-900 mb-2">Required Materials</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={inputs.material}
                onChange={(e) => setInputs({...inputs, material: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('requirements.materials', 'material'))}
                placeholder="Add required material"
                className="flex-1 px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => addItem('requirements.materials', 'material')}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-1">
              {formData.requirements.materials.map((material, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-emerald-700">
                  <span className="flex-1">• {material}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(index, 'requirements.materials')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="certificate"
              checked={formData.certificate}
              onChange={(e) => setFormData({...formData, certificate: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="certificate" className="text-sm text-emerald-900">
              Offer certificate upon completion
            </label>
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
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {course ? 'Update' : 'Create'} Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;
