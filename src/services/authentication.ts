import api from "./api.ts";

const Authentication = {
  login: async (credentials: { email: string, password: string }) => {
    const response = await api.post("/api/auth/login", credentials);
    const { token, user } = response.data;
  
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", token);
  
    return !!token
  },

  register: async (userData: any) => {
    const res = await api.post("/api/auth/sign_up", userData);
    return res.data;
  },

  logout: async () => {
    const res = await api.post("/api/auth/logout");
    if (res.status === 200) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
    }

    return res.data;
  }
}

export default Authentication;
