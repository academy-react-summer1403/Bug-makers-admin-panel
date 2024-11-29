// ** Axios Imports
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2'

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
    if (response.data.success) {
      toast.success(response.data.message || 'عملیات با موفقیت انجام شد')
    }     
    if (response.data.success) {
      toast.success(response.data.message || 'عملیات با موفقیت انجام شد')
    }  
    return response;
  },
  
  (error) => {
    if (error.response && error.response.status === 422) {
      const errorMessage = error.response.data.ErrorMessage || "خطا: ورودی نامعتبر.";
      toast.error(errorMessage || 'با خطا مواجه شدید')

    }
    if (error.response.status === 401) {
      toast.error(errorMessage || 'ابتدا وارد حساب کاربری خود شوید')

    }
    if (error.response.status === 403) {
      const errorMessage = error.response.data.ErrorMessage || "خطا: ورودی نامعتبر.";
      toast.error(errorMessage || 'با خطا مواجه شدید')

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
