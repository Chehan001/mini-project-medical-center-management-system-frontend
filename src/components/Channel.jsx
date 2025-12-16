import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Avatar,
  Divider,
  Fab,
  Alert,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './NavBar';

// Icons
import AddIcon from '@mui/icons-material/Add';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PushPinIcon from '@mui/icons-material/PushPin';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Channel = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      type: 'medical',
      title: 'COVID-19 Vaccination Drive',
      message:
        'All students are requested to participate in the upcoming vaccination drive on campus.',
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
        'Mandatory safety training for all lab users will be held this Friday at 2 PM.',
      author: 'Admin Office',
      timestamp: new Date('2024-11-27T14:20:00'),
      priority: 'medium',
      pinned: false,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [newNotice, setNewNotice] = useState({
    type: 'general',
    title: '',
    message: '',
    priority: 'medium',
  });

  const noticeTypes = {
    medical: {
      label: 'Medical',
      icon: LocalHospitalIcon,
      gradient: 'linear-gradient(135deg,#43cea2,#185a9d)',
    },
    warning: {
      label: 'Warning',
      icon: WarningAmberIcon,
      gradient: 'linear-gradient(135deg,#f7971e,#ffd200)',
    },
    info: {
      label: 'Information',
      icon: InfoIcon,
      gradient: 'linear-gradient(135deg,#56ccf2,#2f80ed)',
    },
    general: {
      label: 'General',
      icon: AnnouncementIcon,
      gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
    },
  };

  const priorityColors = {
    high: '#e53935',
    medium: '#fb8c00',
    low: '#43a047',
  };

  const formatTime = (date) => {
    const diff = Math.floor((new Date() - date) / 60000);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.message) return;

    setNotices([
      {
        id: Date.now(),
        ...newNotice,
        author: 'Current User',
        timestamp: new Date(),
        pinned: false,
      },
      ...notices,
    ]);

    setOpenDialog(false);
    setNewNotice({ type: 'general', title: '', message: '', priority: 'medium' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  const handlePin = (id) => {
    setNotices(
      notices.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      )
    );
  };

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.timestamp - a.timestamp;
  });

  return (
    <Box minHeight="100vh" sx={{ background: 'linear-gradient(#80e4be,#a9e0cb)' }}>
      <NavBar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Stack alignItems="center" spacing={2} mb={4}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: '#667eea' }}>
            <NotificationsActiveIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight={800} color="white">
            Medical Notice Channel
          </Typography>
        </Stack>

        {/* Success */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Notice posted successfully!
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notices */}
        <Grid container spacing={3}>
          {sortedNotices.map((notice) => {
            const Icon = noticeTypes[notice.type].icon;
            return (
              <Grid item xs={12} md={6} key={notice.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    border: notice.pinned ? '2px solid #667eea' : 'none',
                  }}
                >
                  <Box
                    height={6}
                    bgcolor={priorityColors[notice.priority]}
                  />
                  <CardContent>
                    {notice.pinned && (
                      <Chip
                        icon={<PushPinIcon />}
                        label="Pinned"
                        size="small"
                        color="primary"
                        sx={{ mb: 1 }}
                      />
                    )}

                    <Stack direction="row" spacing={2}>
                      <Avatar sx={{ background: noticeTypes[notice.type].gradient }}>
                        <Icon />
                      </Avatar>
                      <Box flex={1}>
                        <Typography fontWeight={700}>
                          {notice.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {notice.message}
                        </Typography>
                        <Stack direction="row" spacing={1} mt={1}>
                          <PersonIcon fontSize="small" />
                          <Typography variant="caption">
                            {notice.author}
                          </Typography>
                          <AccessTimeIcon fontSize="small" />
                          <Typography variant="caption">
                            {formatTime(notice.timestamp)}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Stack direction="row" justifyContent="flex-end">
                      <IconButton onClick={() => handlePin(notice.id)}>
                        <PushPinIcon />
                      </IconButton>
                      <IconButton disabled>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(notice.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Empty */}
        {notices.length === 0 && (
          <Stack alignItems="center" mt={8}>
            <MedicalServicesIcon sx={{ fontSize: 80, color: 'white' }} />
            <Typography color="white">No notices yet</Typography>
          </Stack>
        )}

        {/* FAB */}
        <Fab
          sx={{ position: 'fixed', bottom: 32, right: 32, bgcolor: '#667eea' }}
          onClick={() => setOpenDialog(true)}
        >
          <AddIcon />
        </Fab>

        {/* Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
          <DialogTitle>Create Notice</DialogTitle>
          <DialogContent>
            <Stack spacing={3} mt={1}>
              <TextField
                select
                SelectProps={{ native: true }}
                label="Type"
                value={newNotice.type}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, type: e.target.value })
                }
              >
                {Object.entries(noticeTypes).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </TextField>

              <TextField
                label="Title"
                value={newNotice.title}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, title: e.target.value })
                }
              />

              <TextField
                label="Message"
                multiline
                rows={4}
                value={newNotice.message}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, message: e.target.value })
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddNotice}>
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Channel;
