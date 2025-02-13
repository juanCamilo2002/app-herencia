import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from "../store/customerSlice";
import { useCallback } from "react";

export const useCustomers = () => {
    const dispatch = useDispatch();
    const { customers, loading, error } = useSelector((state) => state.customers);

    const loadCustomers = useCallback(() => {
        dispatch(fetchCustomers()).unwrap();
    }, [dispatch]);

    const addCustomer = useCallback((newCustomer) => {
        dispatch(createCustomer(newCustomer));
    }, [dispatch]);

    const editCustomer = useCallback((id, updatedCustomer) => {
        dispatch(updateCustomer({ id, updatedCustomer }));
    }, [dispatch]);

    const removeCustomer = useCallback((id) => {
        dispatch(deleteCustomer(id));
    }, [dispatch]);

    return { customers, loading, error, loadCustomers, addCustomer, editCustomer, removeCustomer };
};
