import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { useCallback } from "react";

export const useProducts = () => {
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector( state => state.products);

    const loadProducts = useCallback((queryParams={})=>{
        dispatch(fetchProducts({queryParams})).unwrap();
    },[dispatch]);

    return {products, loading, error, loadProducts};
}