import axiosInstance from "../../../axiosInstance";

export const movementService = {
    fetchMovements : async (queryParams = {}) => {
        try {
            const queryString = new URLSearchParams(queryParams).toString();
            const url = queryString ? `/movements?${queryString}` : "/movements";
            return await axiosInstance.get(url);
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al obtener movimientos");
        }
    }
};