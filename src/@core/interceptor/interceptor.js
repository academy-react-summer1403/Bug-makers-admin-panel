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
      Swal.fire({
        title: response.data.message,
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: false,
        showConfirmButton: false,
        customClass: {
          timerProgressBar: 'bg-success',
        }
      });
    }
    if (response.data.status === 200) {
      const Message = response.data.message || "خطا: ورودی نامعتبر.";
      Swal.fire({
        title: 'تایید',
        text: Message,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: false,
        showConfirmButton: false,
        customClass: {
          timerProgressBar: 'bg-success',
        }
      });
    }
    return response;
  },
  
  (error) => {
    if (error.response && error.response.status === 422) {
      const errorMessage = error.response.data.ErrorMessage || "خطا: ورودی نامعتبر.";

      Swal.fire({
        title: 'با خطا مواجه شدید',
        text: errorMessage,
        icon: 'error',
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: false,
        showConfirmButton: false,
        customClass: {
          timerProgressBar: 'bg-danger',
        }
      });
    }
    if (error.response.status === 401) {
      Swal.fire({
        title: 'با خطا مواجه شدید',
        text: 'ابتدا وارد حساب کاربری خود شوید',
        icon: 'error',
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: false,
        showConfirmButton: false,
        customClass: {
          timerProgressBar: 'bg-danger',
        }
      });
    }
    if (error.response.status === 403) {
      const errorMessage = error.response.data.ErrorMessage || "خطا: ورودی نامعتبر.";

      Swal.fire({
        title: 'با خطا مواجه شدید',
        text: errorMessage,
        icon: 'error',
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: false,
        showConfirmButton: false,
        customClass: {
          timerProgressBar: 'bg-danger',
        }
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
