import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customerService } from "../services/customerService";

const initialState = {
    customers: [],
    loading: false,
    error: null,
}

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    const response = await customerService.fetchCustomers();
    return response.data.data;
});

export const createCustomer = createAsyncThunk('customers/createCustomer', async (newCustomer) => {
    const response = await customerService.createCustomer(newCustomer);
    return response.data.data;
});

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async ({ id, updatedCustomer }) => {
    const response = await customerService.updateCustomer(id, updatedCustomer);
    return response.data.data;
});

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id) => {
    await customerService.deleteCustomer(id);
    return id;
});

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error al cargar clientes';
            })
            .addCase(createCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customers.push(action.payload);
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error al crear cliente';
            })
            .addCase(updateCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.customers.findIndex(customer => customer._id === action.payload._id);
                if (index >= 0) {
                  state.customers[index] = action.payload;
                }
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error al actualizar cliente';
            })
            .addCase(deleteCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = state.customers.filter((customer) => customer._id !== action.payload);
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error al eliminar cliente';
            });
    },
});

export default customerSlice.reducer;