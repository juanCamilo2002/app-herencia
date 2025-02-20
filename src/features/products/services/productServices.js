import axiosInstance from "../../../axiosInstance";

export const productService = {
    fetchProduts: async (queryParams = {}) => {
        try {
            const queryString = new URLSearchParams(queryParams).toString();
            const url = queryString ? `/products?${queryString}` : "/products";
            return await axiosInstance.get(url);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener productos');
        }
    },
}