import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});
const fullUrl = window.location.href;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (![201, 200].includes(error.response?.status) && !fullUrl.includes('/login')) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
