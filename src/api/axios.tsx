import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
});

//요청
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
