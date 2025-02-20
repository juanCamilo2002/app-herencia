import { useDispatch, useSelector } from "react-redux";
import { createSale, fetchSales } from "../store/saleSlice";
import { useCallback } from "react";

export const useSales = () => {
    const dispatch = useDispatch();
    const { sales, loading, error } = useSelector((state) => state.sales);  

    const loadSales = useCallback((queryParams = {}) => {
        dispatch(fetchSales({ queryParams })).unwrap();
    }, [dispatch]);

    const addSale = useCallback((newSale) => {
        dispatch(createSale(newSale));
      }, [dispatch]);
    

    return { sales, loading, error, loadSales, addSale };
}