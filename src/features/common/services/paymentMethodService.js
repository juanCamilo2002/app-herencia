import axiosInstance from "../../../axiosInstance";

export const paymentMethodService = {
    fetchPaymentMethods: async (queryParams = {}) => {
        try {
            const queryString = new URLSearchParams(queryParams).toString();
            const url = queryString ? `/payment-methods?${queryString}` : "/payment-methods";
            return await axiosInstance.get(url);
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al obtener métodos de pago");
        }
    },
};