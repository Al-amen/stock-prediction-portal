import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { saveToken } from '../utils/auth';
import Toast from '../plugin/Toast';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 🔄 loading state
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const res = await axiosInstance.post(`user/login/`, formData);
      saveToken(res.data.access, res.data.refresh);
      Toast().fire({
        icon: 'success',
        title: 'Successfully Logged In',
      });
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.log("Login error",error)
      setMessage('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-3">Login</h3>

        {message && <div className="alert alert-danger">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <small><Link to="/forgot-password">Forgot Password?</Link></small><br />
          <small>Don't have an account? <Link to="/register">Register</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
