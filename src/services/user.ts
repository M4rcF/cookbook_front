import api from "./api.ts";

const UserService = {
  updateUser: async (user_id: number, data: any) => {
    const res = await api.put(`/api/users/${user_id}`, data);

    console.log('res', res);

    if (res.status === 200) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token')

      window.location.href='/login'
    }

    return res.data;
  },
}

export default UserService;
