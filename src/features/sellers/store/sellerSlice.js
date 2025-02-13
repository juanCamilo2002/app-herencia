import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sellerService } from '../services/sellerService';

const initialState = {
  sellers: [],
  loading: false,
  error: null
}


// Async Thunks for CRUD operations
export const fetchSellers = createAsyncThunk('sellers/fetchSellers', async ({queryParams ={}}) => {
  const response = await sellerService.fetchSellers(queryParams);
  return response.data.data;
});

export const createSeller = createAsyncThunk('sellers/createSeller', async (newSeller) => {
  const response = await sellerService.createSeller(newSeller);
  return response.data.data;
});

export const updateSeller = createAsyncThunk('sellers/updateSeller', async ({ id, updatedSeller }) => {
  const response = await sellerService.updateSeller(id, updatedSeller);
  return response.data.data;
});

export const deleteSeller = createAsyncThunk('sellers/deleteSeller', async (id) => {
  await sellerService.deleteSeller(id);
  return id;
});


const sellerSlice = createSlice({
  name: 'sellers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar vendedores';
      })
      .addCase(createSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers.push(action.payload);
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al crear vendedor';
      })
      .addCase(updateSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sellers.findIndex(seller => seller._id === action.payload._id);
        if (index >= 0) {
          state.sellers[index] = action.payload;
        }
      })                                        
      .addCase(updateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar vendedor';
      })
      .addCase(deleteSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = state.sellers.filter(seller => seller._id !== action.payload);
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al eliminar vendedor';
      });
  }
});

export default sellerSlice.reducer;