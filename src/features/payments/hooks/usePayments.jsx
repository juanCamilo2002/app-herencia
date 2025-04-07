import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayments,
  createPayment,
  deletePayment,
  updatePayment,
} from "../store/paymentSlice";
import { useCallback } from "react";
import {
  createPaymentSale,
  deletePaymentSale,
  updatePaymentSale,
} from "../../sales/store/saleSlice";

export const usePayments = () => {
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector((state) => state.payments);

  const loadPayments = useCallback(
    (queryParams = {}) => {
      dispatch(fetchPayments({ queryParams })).unwrap();
    },
    [dispatch]
  );

  const createCustomerPayment = useCallback(
    (payment) => {
      dispatch(createPayment(payment)).unwrap();
      dispatch(createPaymentSale(payment));
    },
    [dispatch]
  );

  const deleteCustomerPayment = useCallback(
    (payment) => {
      dispatch(deletePayment(payment._id)).unwrap();
      dispatch(deletePaymentSale(payment));
    },
    [dispatch]
  );

  const updateCustomerPayment = useCallback(
    (oldPayment, newPayment) => {
      dispatch(updatePayment({ payment: newPayment })).unwrap();
      dispatch(updatePaymentSale({ oldPayment, updatedPayment: newPayment }));
    },
    [dispatch]
  );

  return {
    payments,
    loading,
    error,
    loadPayments,
    createCustomerPayment,
    deleteCustomerPayment,
    updateCustomerPayment,
  };
};
