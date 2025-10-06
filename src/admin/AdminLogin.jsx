import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/admin-login', {
        email: form.email,
        password: form.password,
      });

      // Save token and role in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      alert('Admin login successful!');
      navigate('/admin/dashboard'); 
    } catch (err) {
      console.error(err);
      alert('Login failed! Check credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: '40px auto', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px #b2dfdb' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Admin Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Admin Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 6, border: '1px solid #b2dfdb' }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 6, border: '1px solid #b2dfdb' }}
      />
      <button
        type="submit"
        style={{
          width: '100%',
          padding: 10,
          background: '#26a69a',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontWeight: 'bold',
          fontSize: 16,
          cursor: 'pointer'
        }}
      >
        Login
      </button>
    </form>
  );
};

export default AdminLogin;
