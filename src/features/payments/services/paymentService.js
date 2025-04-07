import axiosInstance from "../../../axiosInstance";

export const paymentService = {
  fetchPayments: async (queryParams = {}) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const url = queryString
        ? `/customer-payments?${queryString}`
        : "/customer-payments";
      return await axiosInstance.get(url);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener pagos"
      );
    }
  },
  createPayment: async (payment) => {
    try {
      return await axiosInstance.post("/customer-payments", payment);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al crear el pago"
      );
    }
  },
  deletePayment: async (paymentId) => {
    try {
      return await axiosInstance.delete(`/customer-payments/${paymentId}`);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al eliminar el pago"
      );
    }
  },

  updatePayment: async (payment) => {
    try {
      return await axiosInstance.put(
        `/customer-payments/${payment._id}`,
        payment
      );
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al actualizar el pago"
      );
    }
  },
};
