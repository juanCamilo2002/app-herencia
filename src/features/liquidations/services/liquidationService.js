import axiosInstance from "../../../axiosInstance";

export const liquidationService = {
  fetchLiquidations: async (queryParams = {}) => {
    try {
        try {
            const queryString = new URLSearchParams(queryParams).toString();
            const url = queryString ? `/liquidations?${queryString}` : "/liquidations";
            return await axiosInstance.get(url);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener las liquidaciones');
        }
    } catch (error) {
        
    }
  },
};
