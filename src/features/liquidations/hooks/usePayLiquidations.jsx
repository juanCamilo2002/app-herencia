import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { useLiquidations } from "./useLiquidations";
import { clearError, payLiquidation } from "../store/payliquidationSlice";

export const usePayLiquidations = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.payLiquidation);
  const { loadLiquidations } = useLiquidations();

  const processLiquidation = useCallback(
    async (sellerId) => {
      await dispatch(payLiquidation(sellerId)).unwrap();
      loadLiquidations();
    },
    [dispatch]
  );

  const dismissError = () => {
    dispatch(clearError()); // Borra el error manualmente
  };

  return { loading, error, processLiquidation, dismissError };
};
