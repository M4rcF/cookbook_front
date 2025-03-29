import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ou sua URL real
});

// ✅ Interceptor para incluir o token no header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Interceptor para capturar erro 401 (token expirado)
api.interceptors.response.use(
  (response) => response, // sucesso
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // redireciona
    }

    return Promise.reject(error); // mantém o erro para que o caller trate se quiser
  }
);

export default api;
