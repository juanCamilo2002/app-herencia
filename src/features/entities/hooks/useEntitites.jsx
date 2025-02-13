import { useDispatch, useSelector } from "react-redux";
import { fetchEntities } from "../store/entitySlice";
import { useCallback } from "react";

export const useEntities = () => {
    const dispatch = useDispatch();
    const { entities, loading, error } = useSelector((state) => state.entities);

    const loadEntities = useCallback((queryParams={})=>{
        dispatch(fetchEntities({queryParams})).unwrap();
    }, [dispatch]);

    return { entities, loading, error, loadEntities };
}
