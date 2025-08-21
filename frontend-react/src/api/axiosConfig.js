import axios from 'axios';
import { getToken } from '../utils/auth';

const baseURL = import.meta.env.VITE_BACKEND_BASE_API;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add token
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);



// Response interceptor: Refresh token if expired
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh_token = localStorage.getItem('refresh_token');
      if (refresh_token) {
        try {
          const response = await axios.post(
            `${baseURL}user/token/refresh/`,
            { refresh: refresh_token },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const newAccessToken = response.data.access;
          localStorage.setItem('access_token', newAccessToken);

          // Update header and retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      } 
    }

    return Promise.reject(error);
  }
);

export default axiosInstance