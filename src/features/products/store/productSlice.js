import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../services/productServices";

const initialState = {
    products: [],
    loading: false,
    error: null
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async ({ queryParams = {} }) => {
    const response = await productService.fetchProduts(queryParams);
    return response.data.data;
});


const productSlice = createSlice({
    name: "products",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchProducts.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchProducts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.products = action.payload;
                })
                .addCase(fetchProducts.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || "Error al cargar productos";
                });
        },
});

export default productSlice.reducer;