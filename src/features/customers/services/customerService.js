import axiosInstance from "../../../axiosInstance";

export const customerService = {
    fetchCustomers: async () => {
        try {
           return await axiosInstance.get('/customers'); 
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener clientes');
        }
    },
    createCustomer: async (customer) => {
        try {
            return await axiosInstance.post('/customers', customer);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al crear cliente');
        }
    },
    updateCustomer: async (id, customer) => {
        try {
            return await axiosInstance.put(`/customers/${id}`, customer);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al actualizar cliente');
        }
    },
    deleteCustomer: async (id) => {
        try {
            return await axiosInstance.delete(`/customers/${id}`);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al eliminar cliente');
        }
    }
}