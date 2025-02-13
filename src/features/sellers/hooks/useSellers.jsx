import { useDispatch, useSelector } from 'react-redux';
import { createSeller, deleteSeller, fetchSellers, updateSeller } from '../store/sellerSlice';
import { useCallback } from 'react';


export const useSellers = () => {
  const dispatch = useDispatch();
  const { sellers, loading, error } = useSelector((state) => state.sellers);

  const loadSellers = useCallback((queryParams={}) => {
    dispatch(fetchSellers({queryParams})).unwrap();
  }, [dispatch]);

  const addSeller = useCallback((newSeller) => {
    dispatch(createSeller(newSeller));
  }, [dispatch]);

  const editSeller = useCallback((id, updatedSeller) => {
    dispatch(updateSeller({ id, updatedSeller }));
  }, [dispatch]);

  const removeSeller = useCallback((id) => {
    dispatch(deleteSeller(id));
  }, [dispatch]);

  return { sellers, loading, error, loadSellers, addSeller, editSeller, removeSeller };
};