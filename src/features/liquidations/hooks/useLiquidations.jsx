import { useDispatch, useSelector } from "react-redux";
import { fetchLiquidations } from "../store/liquidationSlice";
import { useCallback } from "react";

export const useLiquidations = () => {
  const dispatch = useDispatch();
  const { liquidations, loading, error } = useSelector(
    (state) => state.liquidations
  );

  const loadLiquidations = useCallback(
    (queryParams = {}) => {
      dispatch(fetchLiquidations({ queryParams })).unwrap();
    },
    [dispatch]
  );

  return { liquidations, loading, error, loadLiquidations };
};
