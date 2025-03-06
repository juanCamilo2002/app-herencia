import axiosInstance from "../../../axiosInstance";

export const liquidationService = {
  fetchLiquidations: async (queryParams = {}) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const url = queryString
        ? `/liquidations?${queryString}`
        : "/liquidations";
      return await axiosInstance.get(url);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener las liquidaciones"
      );
    }
  },
  payLiquidation: async (sellerId) => {
    try {
      const url = `/liquidations/pay/${sellerId}`;
      return await axiosInstance.post(url);
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(
          error.response.data.message || "Error al pagar liquidaciones"
        );
      }
      return Promise.reject("No se pudo conectar al servidor");
    }
  },
};
