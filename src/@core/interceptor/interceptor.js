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
      const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.5) {
            resolve('foo')
          } else {
            reject('fox')
          }
        }, 1000)
      })
      toast.promise(
        myPromise,
         {
           loading: 'در حال پردازش',
           success: <b>عملیات با موفقیت انجام شد</b>,
           error: <b>خطا</b>,
         }
       );    }
    if (response.data.status === 200) {
      const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.5) {
            resolve('foo')
          } else {
            reject('fox')
          }
        }, 1000)
      })
      toast.promise(
        myPromise,
         {
           loading: 'در حال پردازش',
           success: <b>عملیات با موفقیت انجام شد</b>,
           error: <b>خطا</b>,
         }
       ); 
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
