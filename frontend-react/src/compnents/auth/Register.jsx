import { useState } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../../plugin/Toast';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/register/`, {
        username,
        email,
        password,
        password1: confirmPassword
      });

      Toast().fire({
        icon: res.data.icon || 'success',
        title: res.data.message || 'Registered successfully!',
      });

      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error("REGISTRATION ERROR:", error.response);
    
      let errMsg = 'Error during registration';
      let icon = 'error';
    
      if (error?.response?.data) {
        const data = error.response.data;
        if (typeof data.message === 'string') {
          errMsg = data.message;
          icon = data.icon || 'error';
        } else {
          // Handle Django ValidationError format (e.g. {email: ["..."]})
          const firstKey = Object.keys(data)[0];
          errMsg = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
        }
      }
    
      Toast().fire({
        icon: icon,
        title: errMsg,
      });
    
      setMessage(errMsg);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-4">Create an Account</h3>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>

          <div className="text-center mt-3">
            <small>Already have an account? <Link to="/login">Login here</Link></small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
