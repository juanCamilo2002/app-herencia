import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentMethods } from "../store/paymentMethodSlice";
import { useCallback } from "react";

export const usePaymentMethods = () => {
  const dispatch = useDispatch();
  const { paymentMethods, loading, error } = useSelector((state) => state.paymentMethods);

  const loadPaymentMethods = useCallback((queryParams = {}) => {
    dispatch(fetchPaymentMethods({ queryParams })).unwrap();
  }, [dispatch]);

  return { paymentMethods, loading, error, loadPaymentMethods };
}