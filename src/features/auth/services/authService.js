import axiosInstance from '../../../axiosInstance';  

export const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email, password) => {
    const response = await axiosInstance.post('/auth/register', { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  }
};
