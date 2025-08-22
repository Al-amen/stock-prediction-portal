import React, { useState } from 'react';
import axios from 'axios';
import Toast from '../../plugin/Toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
  
    try {
      // ✅ await the POST request
      const res = await axios.post(
        `http://127.0.0.1:8000/api/v1/user/password-reset/`,
        { email }
      );
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
  
      Toast().fire({
        icon: res.data.icon || 'info',
        title: res.data.message,
      });
  
      setMessage(res.data.message);
      setEmail('');
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
    <>
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-3">Forgot Password</h3>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-warning w-100">Send Reset Link</button>
        </form>

        <div className="text-center mt-3">
          <small><a href="/login">Back to Login</a></small>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default ForgotPassword