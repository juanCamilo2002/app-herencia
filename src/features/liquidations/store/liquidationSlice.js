import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { liquidationService } from "../services/liquidationService";

const initialState = {
  liquidations: [],
  loading: false,
  error: null,
};

export const fetchLiquidations = createAsyncThunk(
  "liquidations/fetchLiquidations",
  async ({ queryParams = {} }) => {
    const response = await liquidationService.fetchLiquidations(queryParams);
    return response.data.data;
  }
);

const liquidationSlice = createSlice({
  name: "liquidations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiquidations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiquidations.fulfilled, (state, action) => {
        state.loading = false;
        state.liquidations = action.payload;
      })
      .addCase(fetchLiquidations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar liquidaciones";
      });
  },
});

export default liquidationSlice.reducer;
