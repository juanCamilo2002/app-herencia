import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "../store/productSlice";
import { useCallback } from "react";

export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const loadProducts = useCallback(
    (queryParams = {}) => {
      dispatch(fetchProducts({ queryParams })).unwrap();
    },
    [dispatch]
  );

  const addProduct = useCallback(
    (newProduct) => {
      dispatch(createProduct(newProduct));
    },
    [dispatch]
  );

  const editProduct = useCallback(
    (id, updatedProduct) => {
      dispatch(updateProduct({ id, updatedProduct }));
    },
    [dispatch]
  );

  const removeProduct = useCallback(
    (id) => {
      dispatch(deleteProduct(id));
    },
    [dispatch]
  );

  return { products, loading, error, loadProducts, addProduct, editProduct, removeProduct };
};
