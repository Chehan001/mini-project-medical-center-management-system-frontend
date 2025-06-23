// frontend/src/services/authService.js
import api from './api';

// User registration
export const register = async (data) => {
  try {
    const res = await api.post('/user/register', data);
    return res.data;
  } catch (err) {
    // Improved error handling: Check if response exists and provide a meaningful message
    const errorMessage = err.response?.data?.message || err.message || 'An error occurred during registration';
    throw new Error(errorMessage);
  }
};

// User login
export const login = async (data) => {
  try {
    const res = await api.post('/auth/login', data);
    return res.data; // e.g., token or user data
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || 'An error occurred during login';
    throw new Error(errorMessage);
  }
};

// Request a reset token
export const requestReset = async (email) => {
  try {
    const res = await api.post('/auth/request-password-reset', {
      university_mail: email,
    });
    return res.data.message;
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || 'An error occurred while requesting password reset';
    throw new Error(errorMessage);
  }
};

// Reset password using token
export const resetPassword = async ({ userId, token, password, confirmPassword }) => {
  try {
    const res = await api.post(`/auth/reset-password/${userId}/${token}`, {
      password,
      confirmPassword,
    });
    return res.data.message;
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || 'An error occurred while resetting the password';
    throw new Error(errorMessage);
  }
};
