import React, { useState } from 'react';
import { Plus, Bell, Heart, AlertTriangle, Info, Megaphone, Clock, User, Pin, X, Eye, Tag } from 'lucide-react';

// Import local images
import img1 from '../assets/notice1.jpg';
import img2 from '../assets/notice2.jpg';
import img3 from '../assets/notice3.png';
import img4 from '../assets/notice4.jpg';
import img6 from '../assets/notice6.jpg';

const Channel = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      type: 'medical',
      title: 'COVID-19 Vaccination Drive',
      message: 'All students are requested to participate in the upcoming vaccination drive on campus. Please bring your ID cards and previous vaccination certificates.',
      author: 'Dr. Sarah Johnson',
      timestamp: new Date(Date.now() - 3600000),
      priority: 'high',
      pinned: true,
    },
    {
      id: 2,
      type: 'general',
      title: 'Lab Safety Training Session',
      message: 'Mandatory safety training for all lab users will be held this Friday at 2 PM in the main auditorium. Attendance is compulsory.',
      author: 'Admin Office',
      timestamp: new Date(Date.now() - 7200000),
      priority: 'medium',
      pinned: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Chemical Spill Protocol Update',
      message: 'New emergency procedures for chemical spills have been implemented. Please review the updated guidelines on the safety board.',
      author: 'Safety Committee',
      timestamp: new Date(Date.now() - 86400000),
      priority: 'high',
      pinned: false,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newNotice, setNewNotice] = useState({
    type: 'general',
    title: '',
    message: '',
    priority: 'medium',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Educational images data with local imports
  const educationalImages = [
    {
      id: 1,
      title: 'Types of Heart Disease',
      description: 'Learn about different cardiovascular conditions including coronary artery disease, heart failure, valve disease, and arrhythmias.',
      category: 'Cardiovascular Health',
      image: img1,
      details: 'Understanding heart conditions is crucial for prevention. Key risk factors include hypertension, high cholesterol, smoking, obesity, and sedentary lifestyle.',
    },
    {
      id: 2,
      title: 'Diabetes Complications',
      description: 'Understanding the systemic effects of diabetes including eye disease, stroke, heart damage, renal failure, and neuropathy.',
      category: 'Endocrine Health',
      image: img2,
      details: 'Diabetes affects multiple organ systems. Regular monitoring, medication adherence, and lifestyle modifications are essential for management.',
    },
    {
      id: 3,
      title: 'Dangers of Smoking',
      description: 'Global smoking statistics and health risks. 5.5 trillion cigarettes are smoked worldwide annually, causing millions of preventable deaths.',
      category: 'Preventive Health',
      image: img3,
      details: 'Smoking is the leading cause of preventable death. It increases risk of lung cancer, COPD, heart disease, and stroke.',
    },
    {
      id: 4,
      title: 'Youth Health Education',
      description: 'Youth smoking trends: 1,600 youth try their first cigarette daily in the U.S., with 4.9M students as current tobacco users.',
      category: 'Youth Health',
      image: img4,
      details: 'Early prevention and education are critical. Peer pressure, mental health issues, and accessibility are major contributing factors.',
    },
    {
      id: 5,
      title: 'Stress Response System',
      description: 'How the body responds to stress through the hypothalamus, nerve impulses, and hormonal changes affecting multiple organs.',
      category: 'Mental Health',
      image: img6,
      details: 'Chronic stress impacts physical and mental health. Learn coping strategies including exercise, meditation, and professional support.',
    },
  ];

  const noticeTypes = {
    medical: {
      color: '#54dabfff',
      icon: Heart,
      label: 'Medical',
      gradient: 'from-pink-500 to-rose-500',
    },
    warning: {
      color: '#21c972ff',
      icon: AlertTriangle,
      label: 'Warning',
      gradient: 'from-orange-500 to-amber-500',
    },
    info: {
      color: '#446e56ff',
      icon: Info,
      label: 'Information',
      gradient: 'from-blue-500 to-cyan-500',
    },
    general: {
      color: '#3db482ff',
      icon: Megaphone,
      label: 'General',
      gradient: 'from-purple-500 to-indigo-600',
    },
  };

  const priorityColors = {
    high: '#12955aff',
    medium: '#227b48ff',
    low: '#4caf50',
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.message) return;
    const notice = {
      id: Date.now(),
      ...newNotice,
      author: 'Current User',
      timestamp: new Date(),
      pinned: false,
    };
    setNotices([notice, ...notices]);
    setOpenDialog(false);
    setNewNotice({ type: 'general', title: '', message: '', priority: 'medium' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id) => setNotices(notices.filter((n) => n.id !== id));
  const handlePin = (id) => setNotices(notices.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-300 to-teal-200">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Medical Notice Channel</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Health announcements and educational resources</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm font-medium text-green-800">Notice posted successfully!</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {Object.entries(noticeTypes).map(([key, config]) => {
            const count = notices.filter((n) => n.type === key).length;
            const Icon = config.icon;
            return (
              <div
                key={key}
                className={`bg-gradient-to-br ${config.gradient} text-white rounded-2xl shadow-lg p-4 sm:p-6 transform hover:scale-105 transition-all cursor-pointer`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold">{count}</p>
                    <p className="text-xs sm:text-sm opacity-90">{config.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/*  Resources Section  */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2 drop-shadow-lg">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-red-500" />
            Medical Education Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {educationalImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all hover:shadow-2xl"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-700 shadow-lg">
                      Image {img.id}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                      {img.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-tight">{img.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{img.description}</p>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 shadow-md">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2 drop-shadow-lg">
            <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
            Recent Notices
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {sortedNotices.map((notice) => {
              const TypeIcon = noticeTypes[notice.type].icon;
              return (
                <div
                  key={notice.id}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all ${
                    notice.pinned ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <div className="h-2" style={{ backgroundColor: priorityColors[notice.priority] }} />
                  {notice.pinned && (
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 flex items-center gap-2 text-sm font-semibold">
                      <Pin className="w-4 h-4" />
                      Pinned Notice
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4 mb-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${noticeTypes[notice.type].gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <TypeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">{notice.title}</h3>
                          <span className={`px-2 py-1 bg-gradient-to-r ${noticeTypes[notice.type].gradient} text-white text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0`}>
                            {noticeTypes[notice.type].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 flex-wrap">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{notice.author}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(notice.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 my-4" />
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">{notice.message}</p>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handlePin(notice.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          notice.pinned ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Pin className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setOpenDialog(true)}
          className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all flex items-center justify-center z-50"
        >
          <Plus className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* Add Notice Dialog */}
        {openDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Create Notice</h2>
                  </div>
                  <button onClick={() => setOpenDialog(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    value={newNotice.type}
                    onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    {Object.entries(noticeTypes).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="Enter notice title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    value={newNotice.message}
                    onChange={(e) => setNewNotice({ ...newNotice, message: e.target.value })}
                    placeholder="Enter detailed message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setOpenDialog(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNotice}
                  disabled={!newNotice.title || !newNotice.message}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image -->          Detail Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedImage(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-bold text-gray-800 pr-8">{selectedImage.title}</h2>
                  <button onClick={() => setSelectedImage(null)} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 flex-shrink-0">
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                    {selectedImage.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-64 sm:h-96 object-cover rounded-xl mb-6 shadow-lg"
                />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedImage.description}</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-blue-900 mb-2">Additional Information</h4>
                    <p className="text-sm text-blue-900">{selectedImage.details}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;