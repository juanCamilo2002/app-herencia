import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovements } from "../store/movementSlice";

export const useMovements = () => {
  const dispatch = useDispatch();
  const { movements, loading, error } = useSelector((state) => state.movements);

  const loadMovements = useCallback((queryParams = {}) => {
    dispatch(fetchMovements({ queryParams })).unwrap();
  }, [dispatch]);

  return { movements, loading, error, loadMovements };
};


