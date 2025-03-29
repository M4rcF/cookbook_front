import api from "./api.ts";

const Authentication = {
  login: async (credentials: { email: string, password: string }) => {
    console.log('credentials', credentials);
    const response = await api.post("/api/auth/login", credentials);
    const { token } = response.data;

    console.log('response', response);
  
    localStorage.setItem("token", token);
  
    return !!token
  },

  register: async (userData: any) => {
    const res = await api.post("/api/auth/sign_up", userData);
    return res.data;
  }
}

export default Authentication;
