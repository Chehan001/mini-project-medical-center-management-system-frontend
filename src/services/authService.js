// frontend/src/services/authService.js
import api from './api';

// User registration
export const register = async (data) => {
  try {
    const res = await api.post('/user/register', data);
    return res.data;
  } catch (err) {
    // Improved_error_handling
    const errorMessage = err.response?.data?.message || err.message || 'An error occurred during registration';
    throw new Error(errorMessage);
  }
};

// User_login
export const login = async (data) => {
  try {
    const res = await api.post('/auth/login', data);
    return res.data; 
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || 'An error occurred during login';
    throw new Error(errorMessage);
  }
};

// Request_a_reset_token
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

// Reset_password_using_token
export const resetPassword = async ({ userId, token, password, confirmPassword }) => {
  try {
    const cleanUserId = userId.replace(/[<>]/g, '');

    const res = await api.post(`/auth/reset-password/${cleanUserId}/${token}`, {
      password,
      confirmPassword,
    });

    return res.data.message;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || err.message || 'An error occurred while resetting the password';
    throw new Error(errorMessage);
  }
};

