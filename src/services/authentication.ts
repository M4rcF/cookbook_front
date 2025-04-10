import { User } from "../@types/model";
import api from "./api";

const Authentication = {
  login: async (credentials: User) => {
    const response = await api.post("/api/auth/login", credentials);
    const { token, user } = response.data;
  
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", token);
  
    return !!token
  },

  register: async (userData: User) => {
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
