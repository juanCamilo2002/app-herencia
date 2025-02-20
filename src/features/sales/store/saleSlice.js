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

export const createSale = createAsyncThunk('sales/createSales', async (newSale) => {
  const response = await saleService.createSale(newSale);
  return response.data.data;
});

const saleSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
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

export default saleSlice.reducer;
