import React, { useState } from 'react';
import {
  Plus,
  Bell,
  Heart,
  AlertTriangle,
  Info,
  Megaphone,
  Clock,
  User,
  Pin,
  X,
} from 'lucide-react';
import NavBar from './NavBar';

const Channel = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      type: 'medical',
      title: 'COVID-19 Vaccination Drive',
      message:
        'All students are requested to participate in the upcoming vaccination drive on campus. Please bring your ID cards and previous vaccination certificates.',
      author: 'Dr. Sarah Johnson',
      timestamp: new Date('2024-11-28T10:30:00'),
      priority: 'high',
      pinned: true,
    },
    {
      id: 2,
      type: 'general',
      title: 'Lab Safety Training Session',
      message:
        'Mandatory safety training for all lab users will be held this Friday at 2 PM in the main auditorium. Attendance is compulsory.',
      author: 'Admin Office',
      timestamp: new Date('2024-11-27T14:20:00'),
      priority: 'medium',
      pinned: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Chemical Spill Protocol Update',
      message:
        'New emergency procedures for chemical spills have been implemented. Please review the updated guidelines on the safety board.',
      author: 'Safety Committee',
      timestamp: new Date('2024-11-26T09:15:00'),
      priority: 'high',
      pinned: false,
    },
    {
      id: 4,
      type: 'info',
      title: 'First Aid Kit Locations',
      message:
        'First aid kits have been restocked and are available in all laboratories. Please familiarize yourself with their locations.',
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
      description:
        'Learn about different cardiovascular conditions including coronary artery disease, heart failure, valve disease, and more.',
      category: 'Cardiovascular Health',
    },
    {
      id: 2,
      title: 'Diabetes Complications',
      description:
        'Understanding the systemic effects of diabetes including eye disease, stroke, heart damage, renal failure, and neuropathy.',
      category: 'Endocrine Health',
    },
    {
      id: 3,
      title: 'Dangers of Smoking',
      description:
        'Global smoking statistics and health risks. 5.5 trillion cigarettes are smoked worldwide annually.',
      category: 'Preventive Health',
    },
    {
      id: 4,
      title: 'Smoking and Youth',
      description:
        'Youth smoking trends: 1,600 youth try their first cigarette daily in the U.S., with 4.9M students as current tobacco users.',
      category: 'Youth Health',
    },
    {
      id: 5,
      title: 'Health Risk Factors',
      description:
        'Key health indicators including age, gender, height, weight, blood pressure, and vision metrics for health assessment.',
      category: 'Health Monitoring',
    },
    {
      id: 6,
      title: 'Stress Response System',
      description:
        'How the body responds to stress through the hypothalamus, nerve impulses, and hormonal changes affecting multiple organs.',
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
    setNewNotice({
      type: 'general',
      title: '',
      message: '',
      priority: 'medium',
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <NavBar />

      <div className="bg-gradient-to-r from-emerald-600 to-green-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Bell className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Medical Notice Channel
              </h1>
              <p className="text-emerald-100">
                Health announcements and updates
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {showSuccess && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 p-4 rounded">
            Notice posted successfully!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedNotices.map((notice) => {
            const Icon = noticeTypes[notice.type].icon;
            return (
              <div
                key={notice.id}
                className={`bg-white rounded-xl shadow p-6 border ${
                  notice.pinned ? 'border-emerald-400' : 'border-gray-200'
                }`}
              >
                {notice.pinned && (
                  <div className="flex items-center gap-1 text-emerald-600 mb-2">
                    <Pin size={14} /> Pinned
                  </div>
                )}
                <div className="flex gap-3">
                  <Icon className="text-emerald-600" />
                  <div>
                    <h3 className="font-bold">{notice.title}</h3>
                    <p className="text-gray-600 mt-1">{notice.message}</p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-3">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {notice.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {formatTime(notice.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setOpenDialog(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <Plus size={28} />
        </button>

        {openDialog && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between mb-4">
                <h2 className="font-bold">Create Notice</h2>
                <button onClick={() => setOpenDialog(false)}>
                  <X />
                </button>
              </div>

              <input
                className="w-full border p-2 rounded mb-3"
                placeholder="Title"
                value={newNotice.title}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, title: e.target.value })
                }
              />

              <textarea
                className="w-full border p-2 rounded mb-3"
                rows={4}
                placeholder="Message"
                value={newNotice.message}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, message: e.target.value })
                }
              />

              <button
                onClick={handleAddNotice}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Post Notice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
