import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movementService } from "../services/movementService";

const initialState = {
  movements: [],
  loading: false,
  error: null,
};

export const fetchMovements = createAsyncThunk(
  "movements/fetchMovements",
  async ({ queryParams = {} }) => {
    const response = await movementService.fetchMovements(queryParams);
    return response.data.data;
  }
);

const movementSlice = createSlice({
  name: "movements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovements.fulfilled, (state, action) => {
        state.loading = false;
        state.movements = action.payload;
      })
      .addCase(fetchMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar movimientos";
      });
  },
});

export default movementSlice.reducer;