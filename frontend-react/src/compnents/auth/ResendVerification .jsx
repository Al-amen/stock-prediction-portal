import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig'

import Toast from '../plugin/Toast';

const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const res = await axiosInstance.post('user/resend-verification/', { email });

      Toast().fire({
        icon: res.data.icon || 'info',
        title: res.data.message || 'Check your email for verification link!',
      });

      setMessage(res.data.message);
      setEmail('');
    } catch (err) {
      console.error("Resend verification failed:", err.response?.data || err.message);

      const errMsg = err.response?.data?.message || 'Something went wrong.';
      const icon = err.response?.data?.icon || 'error';

      Toast().fire({ icon, title: errMsg });
      setMessage(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Resend Verification Email</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Resend Verification'}
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default ResendVerification;
