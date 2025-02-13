import axiosInstance from '../../../axiosInstance';

export const sellerService = {
  fetchSellers: async (queryParams={}) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const url = queryString ? `/sellers?${queryString}` : "/sellers";
      return await axiosInstance.get(url);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener vendedores');
    }
  },
  fetchSeller: async (id) => {
    try {
      return await axiosInstance.get(`/sellers/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener vendedor');
    }
  },
  createSeller: async (seller) => {
    try {
      return await axiosInstance.post('/sellers', seller);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear vendedor');
    }
  },
  updateSeller: async (id, seller) => {
    try {
      return await axiosInstance.put(`/sellers/${id}`, seller);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar vendedor');
    }
  },
  deleteSeller: async (id) => {
    try {
      return await axiosInstance.delete(`/sellers/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar vendedor');
    }
  }
};