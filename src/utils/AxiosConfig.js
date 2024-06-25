import axios from "axios";

// URL base para simulações
const BASE_URL_SIMULATIONS = "https://simulafin.up.railway.app";

// URL base para contratos
const BASE_URL_CONTRACTS =
  "https://peer-to-peer-loan-service-production.up.railway.app";

const BASE_URL_STOCK =
  "https://stock-api-f7tht.ondigitalocean.app/";

// Instância sem autenticação para simulações
const axiosInstance = axios.create({
  baseURL: BASE_URL_SIMULATIONS,
});

// Instância com autenticação para simulações
const authAxiosInstance = axios.create({
  baseURL: BASE_URL_SIMULATIONS,
});

// Instância com autenticação para contratos
const p2pAxiosInstance = axios.create({
  baseURL: BASE_URL_CONTRACTS,
});

const stockAxiosInstance = axios.create({
  baseURL: BASE_URL_STOCK,
});

authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

p2pAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


stockAxiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000/'; // Substitua '*' pela origem permitida
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export { axiosInstance, authAxiosInstance, p2pAxiosInstance, stockAxiosInstance};
