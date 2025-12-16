import React, { useState } from 'react';
import { Plus, Bell, Heart, AlertTriangle, Info, Megaphone, Clock, User, Pin, X } from 'lucide-react';
import NavBar from './NavBar';

const Channel = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      type: 'medical',
      title: 'COVID-19 Vaccination Drive',
      message: 'All students are requested to participate in the upcoming vaccination drive on campus. Please bring your ID cards and previous vaccination certificates.',
      author: 'Dr. Sarah Johnson',
      timestamp: new Date('2024-11-28T10:30:00'),
      priority: 'high',
      pinned: true,
    },
    {
      id: 2,
      type: 'general',
      title: 'Lab Safety Training Session',
      message: 'Mandatory safety training for all lab users will be held this Friday at 2 PM in the main auditorium. Attendance is compulsory.',
      author: 'Admin Office',
      timestamp: new Date('2024-11-27T14:20:00'),
      priority: 'medium',
      pinned: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Chemical Spill Protocol Update',
      message: 'New emergency procedures for chemical spills have been implemented. Please review the updated guidelines on the safety board.',
      author: 'Safety Committee',
      timestamp: new Date('2024-11-26T09:15:00'),
      priority: 'high',
      pinned: false,
    },
    {
      id: 4,
      type: 'info',
      title: 'First Aid Kit Locations',
      message: 'First aid kits have been restocked and are available in all laboratories. Please familiarize yourself with their locations.',
      author: 'Medical Department',
      timestamp: new Date('2024-11-25T16:45:00'),
      priority: 'low',
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

  const educationalImages = [
    {
      id: 1,
      title: 'Types of Heart Disease',
      description: 'Learn about different cardiovascular conditions including coronary artery disease, heart failure, valve disease, and more.',
      category: 'Cardiovascular Health',
    },
    {
      id: 2,
      title: 'Diabetes Complications',
      description: 'Understanding the systemic effects of diabetes including eye disease, stroke, heart damage, renal failure, and neuropathy.',
      category: 'Endocrine Health',
    },
    {
      id: 3,
      title: 'Dangers of Smoking',
      description: 'Global smoking statistics and health risks. 5.5 trillion cigarettes are smoked worldwide annually.',
      category: 'Preventive Health',
    },
    {
      id: 4,
      title: 'Smoking and Youth',
      description: 'Youth smoking trends: 1,600 youth try their first cigarette daily in the U.S., with 4.9M students as current tobacco users.',
      category: 'Youth Health',
    },
    {
      id: 5,
      title: 'Health Risk Factors',
      description: 'Key health indicators including age, gender, height, weight, blood pressure, and vision metrics for health assessment.',
      category: 'Health Monitoring',
    },
    {
      id: 6,
      title: 'Stress Response System',
      description: 'How the body responds to stress through the hypothalamus, nerve impulses, and hormonal changes affecting multiple organs.',
      category: 'Mental Health',
    },
  ];

  const noticeTypes = {
    medical: {
      color: '#10b981',
      icon: Heart,
      label: 'Medical',
      gradient: 'from-emerald-500 to-green-600',
    },
    warning: {
      color: '#84cc16',
      icon: AlertTriangle,
      label: 'Warning',
      gradient: 'from-lime-500 to-green-500',
    },
    info: {
      color: '#14b8a6',
      icon: Info,
      label: 'Information',
      gradient: 'from-teal-500 to-emerald-500',
    },
    general: {
      color: '#059669',
      icon: Megaphone,
      label: 'General',
      gradient: 'from-green-600 to-emerald-700',
    },
  };

  const priorityColors = {
    high: '#2a9f61',
    medium: '#81bea6',
    low: '#22c55e',
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

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* NavBar Component */}
      <NavBar />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/30">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">Medical Notice Channel</h1>
                <p className="text-emerald-50 font-medium">Health announcements and updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-xl shadow-lg animate-fade-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-green-800">Notice posted successfully!</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(noticeTypes).map(([key, config]) => {
            const count = notices.filter((n) => n.type === key).length;
            const Icon = config.icon;
            return (
              <div
                key={key}
                className={`bg-gradient-to-br ${config.gradient} text-white rounded-2xl shadow-lg hover:shadow-xl p-6 transform hover:scale-105 transition-all cursor-pointer border border-white/20`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold drop-shadow-md">{count}</p>
                    <p className="text-sm opacity-95 font-medium">{config.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Educational Resources Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Medical Education Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all hover:shadow-2xl border border-green-100"
              >
                <div className="h-48 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10" />
                  <div className="relative text-center p-6">
                    <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-xl mb-3 border-4 border-emerald-200">
                      <Heart className="w-10 h-10 text-emerald-600" />
                    </div>
                    <p className="text-sm font-bold text-emerald-700 bg-white px-4 py-1.5 rounded-full inline-block shadow-md">
                      Image {img.id}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-xs font-bold rounded-full mb-3 border border-emerald-200">
                    {img.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{img.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{img.description}</p>
                  <button className="mt-2 w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-2.5 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Recent Notices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedNotices.map((notice) => {
              const TypeIcon = noticeTypes[notice.type].icon;
              return (
                <div
                  key={notice.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all border ${
                    notice.pinned ? 'ring-4 ring-emerald-400 border-emerald-300' : 'border-green-100'
                  }`}
                >
                  {/* Priority Bar */}
                  <div
                    className="h-2"
                    style={{ backgroundColor: priorityColors[notice.priority] }}
                  />

                  {/* Pinned Badge */}
                  {notice.pinned && (
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 flex items-center gap-2 text-sm font-bold shadow-md">
                      <Pin className="w-4 h-4" />
                      Pinned Notice
                    </div>
                  )}

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${noticeTypes[notice.type].gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg border border-white/30`}>
                        <TypeIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-800 leading-tight">{notice.title}</h3>
                          <span className={`px-2.5 py-1 bg-gradient-to-r ${noticeTypes[notice.type].gradient} text-white text-xs font-bold rounded-full whitespace-nowrap flex-shrink-0 shadow-md`}>
                            {noticeTypes[notice.type].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span className="font-medium">{notice.author}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(notice.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-green-100 my-4" />

                    {/* Message */}
                    <p className="text-gray-700 leading-relaxed">{notice.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {notices.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Bell className="w-12 h-12 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No notices yet</h3>
            <p className="text-gray-600">Click the + button to create your first notice</p>
          </div>
        )}

        {/* Floating Add Button */}
        <button
          onClick={() => setOpenDialog(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 transition-all flex items-center justify-center z-50 border-4 border-white"
        >
          <Plus className="w-8 h-8" />
        </button>

        {/* Add Notice Dialog */}
        {openDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-emerald-200">
              <div className="p-6 border-b border-green-100 bg-gradient-to-r from-emerald-50 to-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Create New Notice</h2>
                  </div>
                  <button
                    onClick={() => setOpenDialog(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Notice Type</label>
                  <select
                    value={newNotice.type}
                    onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                  >
                    {Object.entries(noticeTypes).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="Enter notice title"
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea
                    value={newNotice.message}
                    onChange={(e) => setNewNotice({ ...newNotice, message: e.target.value })}
                    placeholder="Enter detailed message"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-green-100 bg-gradient-to-r from-emerald-50 to-green-50 flex gap-3">
                <button
                  onClick={() => setOpenDialog(false)}
                  className="flex-1 px-6 py-3 border-2 border-green-300 rounded-xl font-bold text-gray-700 hover:bg-green-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNotice}
                  disabled={!newNotice.title || !newNotice.message}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  Post Notice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Detail Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-emerald-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-green-100 bg-gradient-to-r from-emerald-50 to-green-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedImage.title}</h2>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-sm font-bold rounded-full border border-emerald-200">
                  {selectedImage.category}
                </span>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-xl p-8 mb-6 text-center border-2 border-green-200">
                  <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-xl mb-4 border-4 border-emerald-300">
                    <Heart className="w-16 h-16 text-emerald-600" />
                  </div>
                  <p className="text-gray-600 font-bold">Educational Image {selectedImage.id}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Place your actual image here from: src/assets/image{selectedImage.id}.jpg
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedImage.description}</p>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                    <p className="text-sm text-emerald-900">
                      <strong>Note:</strong> This is a placeholder. Replace with actual medical education images
                      stored in your assets folder.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-green-100 bg-gradient-to-r from-emerald-50 to-green-50">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
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