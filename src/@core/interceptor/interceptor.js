import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://classapi.sepehracademy.ir/api',
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
