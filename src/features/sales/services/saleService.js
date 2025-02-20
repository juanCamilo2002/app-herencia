import axiosInstance from "../../../axiosInstance";

export const saleService = {
    fetchSales: async (queryParams = {}) => {
        try {
            const queryString = new URLSearchParams(queryParams).toString();
            const url = queryString ? `/sales?${queryString}` : "/sales";
            return await axiosInstance.get(url);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener ventas');
        }
    },
    createSale: async (sale) => {
        try {
          return await axiosInstance.post('/sales', sale);
        } catch (error) {
          throw new Error(error.response?.data?.message || 'Error al crear venta');
        }
      },
}