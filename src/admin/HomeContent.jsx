import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const HomeContent = () => {
  const [contents, setContents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const token = localStorage.getItem('token');

  const fetchContents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/home-content', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContents(res.data);
    } catch (err) {
      console.error('Error fetching contents:', err);
    }
  };

  const handleAddContent = async () => {
    if (!title || !description) return alert('Title and Description required');

    try {
      await axios.post(
        'http://localhost:8000/api/admin/home-content',
        { title, description, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      setImageUrl('');
      fetchContents();
    } catch (err) {
      console.error('Error adding content:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this content?')) return;

    try {
      await axios.delete(`http://localhost:8000/api/admin/home-content/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContents();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    fetchContents();
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home Page Content
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">Add New Content</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddContent}>
          Add Content
        </Button>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Existing Content
      </Typography>
      {contents.map((item) => (
        <Paper
          key={item._id}
          sx={{
            p: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="subtitle1">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ maxWidth: 120, marginTop: 8, borderRadius: 8 }}
              />
            )}
          </Box>
          <IconButton color="error" onClick={() => handleDelete(item._id)}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
};

export default HomeContent;
