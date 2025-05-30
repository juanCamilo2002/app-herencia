 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saleService } from "../services/saleService";

const initialState = {
  sales: [],
  loading: false,
  error: null,
};

export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async ({ queryParams = {} }) => {
    const response = await saleService.fetchSales(queryParams);
    return response.data.data;
  }
);

export const createSale = createAsyncThunk(
  "sales/createSales",
  async (newSale) => {
    const response = await saleService.createSale(newSale);
    return response.data.data;
  }
);

const saleSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    createPaymentSale: (state, action) => {
      const payment = action.payload;
      const index = state.sales.findIndex((sale) => sale._id === payment.sale);
      if (index !== -1) {
        const currentSale = state.sales[index];
        const newContributed = currentSale.contributed + payment.amount;
        const newHasNotPaid = currentSale.hasNotPaid - payment.amount;

        state.sales[index] = {
          ...currentSale,
          contributed: newContributed,
          hasNotPaid: newHasNotPaid,
          statusPay: newContributed >= currentSale.total,
        };
      }
    },
    updatePaymentSale: (state, action) => {
      const { oldPayment, updatedPayment } = action.payload;
      console.log({ oldPayment, updatedPayment });
      const index = state.sales.findIndex(
        (sale) => sale._id === updatedPayment.sale._id
      );
      if (index !== -1) {
        const currentSale = state.sales[index];
        const newContributed =
          currentSale.contributed - oldPayment.amount + updatedPayment.amount;
        const newHasNotPaid =
          currentSale.hasNotPaid + oldPayment.amount - updatedPayment.amount;

        state.sales[index] = {
          ...currentSale,
          contributed: newContributed,
          hasNotPaid: newHasNotPaid,
          statusPay: newContributed >= currentSale.total,
        };
      }
    },

    deletePaymentSale: (state, action) => {
      const payment = action.payload;
      const index = state.sales.findIndex((sale) => sale._id === payment.sale._id);
      if (index !== -1) {
        const currentSale = state.sales[index];
        const newContributed = currentSale.contributed - payment.amount;
        const newHasNotPaid = currentSale.hasNotPaid + payment.amount;
  
        state.sales[index] = {
          ...currentSale,
          contributed: newContributed,
          hasNotPaid: newHasNotPaid,
          statusPay: newContributed >= currentSale.total,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar ventas";
      })
      .addCase(createSale.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.loading = false;
        state.sales.push(action.payload);
      })
      .addCase(createSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al crear vendedor";
      });
  },
});

export const { createPaymentSale, updatePaymentSale, deletePaymentSale } = saleSlice.actions;
export default saleSlice.reducer;
