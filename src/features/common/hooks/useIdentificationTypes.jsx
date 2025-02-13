import { useDispatch, useSelector } from 'react-redux';
import { createidentificationType, deleteidentificationType, fetchidentificationTypes, updateidentificationType } from '../store/identificationTypeSlice';
import { useCallback } from 'react';


export const useIdentificationTypes = () => {
  const dispatch = useDispatch();
  const { identificationTypes, loading, error } = useSelector((state) => state.identificationTypes);

  const loadIdentificationTypes = useCallback((queryParams={}) => {
    dispatch(fetchidentificationTypes({queryParams})).unwrap();
  }, [dispatch]);

  const addIdentificationType = useCallback((newSeller) => {
    dispatch(createidentificationType(newSeller));
  }, [dispatch]);

  const editIdentificationType = useCallback((id, updatedSeller) => {
    dispatch(updateidentificationType({ id, updatedSeller }));
  }, [dispatch]);

  const removeIdentificationType = useCallback((id) => {
    dispatch(deleteidentificationType(id));
  }, [dispatch]);

  return { identificationTypes, loading, error, loadIdentificationTypes, addIdentificationType, editIdentificationType, removeIdentificationType };
};