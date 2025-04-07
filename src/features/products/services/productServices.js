import axiosInstance from "../../../axiosInstance";

export const productService = {
  fetchProduts: async (queryParams = {}) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const url = queryString ? `/products?${queryString}` : "/products";
      return await axiosInstance.get(url);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener productos"
      );
    }
  },
  createProduct: async (product) => {
    try {
      return await axiosInstance.post("/products", product);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al crear producto"
      );
    }
  },
  updateProduct: async (id, product) => {
    try {
      return await axiosInstance.put(`/products/${id}`, product);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al actualizar producto"
      );
    }
  },
  deleteProduct: async (id) => {
    try {
      return await axiosInstance.delete(`/products/${id}`);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al eliminar producto"
      );
    }
  },
};
