import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { liquidationService } from "../services/liquidationService";

const initialState = {
  loading: false,
  error: null,
};

// Acción para pagar liquidaciones
export const payLiquidation = createAsyncThunk(
  "liquidations/payLiquidation",
  async (sellerId, { dispatch, rejectWithValue }) => {
    try {
      const response = await liquidationService.payLiquidation(sellerId);
      const pdfUrl = response.data.pdfUrl; // Obtener URL del backend

      if (pdfUrl) {
        window.open(pdfUrl, "_blank"); // 🟢 Abrir el PDF en una nueva pestaña
      } else {
        throw new Error("No se pudo obtener el archivo de liquidación.");
      }

      return sellerId;
    } catch (error) {
      return rejectWithValue(error || "Error al pagar la liquidación");
    }
  }
);

const payLiquidationSlice = createSlice({
  name: "payLiquidations",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null; // Acción para limpiar el error manualmente
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(payLiquidation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payLiquidation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(payLiquidation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exportar la acción para limpiar el error manualmente si se necesita
export const { clearError } = payLiquidationSlice.actions;

export default payLiquidationSlice.reducer;
