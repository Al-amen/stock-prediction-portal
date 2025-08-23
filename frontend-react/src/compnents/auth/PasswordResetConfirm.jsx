import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Toast from '../../plugin/Toast';
import axiosInstance from '../../api/axiosConfig';

const PasswordResetConfirm = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (formData.new_password !== formData.confirm_password) {
      setMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post(`user/reset-password-confirm/${uidb64}/${token}/`, {
        new_password: formData.new_password,
        confirm_password: formData.confirm_password
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      Toast().fire({
        icon: res.data.icon || 'success',
        title: res.data.message,
      });

      setMessage(res.data.message);
      setFormData({ new_password: '', confirm_password: '' });

      // Redirect to login after a short delay
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Something went wrong';
      Toast().fire({ icon: 'error', title: errMsg });
      setMessage(errMsg);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    //
    <div className="container d-flex justify-content-center align-items-center  " style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-3">Reset Password</h3>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="text-center mt-3">
          <small><a href="/login">Back to Login</a></small>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
