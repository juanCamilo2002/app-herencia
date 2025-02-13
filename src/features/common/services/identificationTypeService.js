import axiosInstance from '../../../axiosInstance';

export const identificationTypeService = {
  fetchIdentificationTypes: async (queryParams={}) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const url = queryString ? `/identification-types?${queryString}` : "/identification-types";
      return await axiosInstance.get(url);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener vendedores');
    }
  },
  fetchIdentificationType: async (id) => {
    try {
      return await axiosInstance.get(`/identification-types/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener vendedor');
    }
  },
  createIdentificationType: async (seller) => {
    try {
      return await axiosInstance.post('/identification-types', seller);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear vendedor');
    }
  },
  updateIdentificationType: async (id, seller) => {
    try {
      return await axiosInstance.put(`/identification-types/${id}`, seller);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar vendedor');
    }
  },
  deleteIdentificationType: async (id) => {
    try {
      return await axiosInstance.delete(`/identification-types/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar vendedor');
    }
  }
};