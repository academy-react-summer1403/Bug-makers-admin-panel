// ** Axios Imports
import axios from 'axios';
import { toast } from 'react-hot-toast'; 

// ** Base URL
const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL
});

// Set up interceptors for authorization and error handling
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here if needed
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Show toast message for successful response
    if (response.data.success) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    // Check for error response and status
    if (error.response && error.response.status === 422) {
      // Assuming the error message is in error.response.data.ErrorMessage
      const errorMessage = error.response.data.ErrorMessage || "خطا: ورودی نامعتبر.";
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
