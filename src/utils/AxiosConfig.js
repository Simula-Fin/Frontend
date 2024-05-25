import axios from 'axios';

// URL base da API
const BASE_URL = 'https://simulafin.up.railway.app';

// Instância sem autenticação
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Instância com autenticação
const authAxiosInstance = axios.create({
  baseURL: BASE_URL,
});


authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance, authAxiosInstance};