import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { paymentService } from "../services/paymentService";

const initialState = {
  payments: [],
  loading: false,
  error: null,
};

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async ({ queryParams = {} }) => {
    const response = await paymentService.fetchPayments(queryParams);
    return response.data.data;
  }
);

export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (payment) => {
    const response = await paymentService.createPayment(payment);
    return response.data.data;
  }
);

export const deletePayment = createAsyncThunk(
  "payments/deletePayment",
  async (paymentId) => {
    await paymentService.deletePayment(paymentId);
    return paymentId;
  }
);

export const updatePayment = createAsyncThunk(
  "payments/updatePayment",
  async ({ payment }) => {
    const response = await paymentService.updatePayment(payment);
    return response.data.data;
  }
);

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar pagos";
      });
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al crear el pago";
      });
    builder
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = state.payments.filter(
          (payment) => payment._id !== action.payload
        );
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al eliminar el pago";
      });
    builder
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = state.payments.map((payment) =>
          payment._id === action.payload._id ? action.payload : payment
        );
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al actualizar el pago";
      });
  },
});

export default paymentSlice.reducer;
