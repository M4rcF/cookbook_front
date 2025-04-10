import { User } from "../@types/model";
import api from "./api";

const UserService = {
  updateUser: async (user_id: number, data: User) => {
    const res = await api.put(`/api/users/${user_id}`, data);

    if (res.status === 200) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token')

      window.location.href='/login'
    }

    return res.data;
  },
}

export default UserService;
