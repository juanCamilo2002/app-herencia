import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { paymentMethodService } from "../services/paymentMethodService";

const initialState = {
    paymentMethods: [],
    loading: false,
    error: null
};

export const fetchPaymentMethods = createAsyncThunk("paymentMethod/fetchPaymentMethods", async ({ queryParams = {} }) => {
    const response = await paymentMethodService.fetchPaymentMethods(queryParams);
    return response.data.data;
});

const paymentMethodSlice = createSlice({
    name: "paymentMethods",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentMethods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentMethods = action.payload;
            })
            .addCase(fetchPaymentMethods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error al cargar métodos de pago";
            });
    }
});

export default paymentMethodSlice.reducer;