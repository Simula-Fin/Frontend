import axios from 'axios';

// URL base para simulações
const BASE_URL_SIMULATIONS = 'https://simulafin.up.railway.app';

// URL base para contratos
const BASE_URL_CONTRACTS = 'https://peer-to-peer-loan-service-production.up.railway.app';

// Instância sem autenticação para simulações
const axiosInstance = axios.create({
  baseURL: BASE_URL_SIMULATIONS,
});

// Instância com autenticação para simulações
const authAxiosInstance = axios.create({
  baseURL: BASE_URL_SIMULATIONS,
});

// Instância com autenticação para contratos
const contractAxiosInstance = axios.create({
  baseURL: BASE_URL_CONTRACTS,
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

contractAxiosInstance.interceptors.request.use(
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

export { axiosInstance, authAxiosInstance, contractAxiosInstance };
