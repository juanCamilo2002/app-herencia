import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { identificationTypeService } from '../services/identificationTypeService';

const initialState = {
  identificationTypes: [],
  loading: false,
  error: null
}


// Async Thunks for CRUD operations
export const fetchidentificationTypes = createAsyncThunk('identificationType/fetchIdentificationTypes', async ({queryParams ={}}) => {
  const response = await identificationTypeService.fetchIdentificationTypes(queryParams);
  return response.data.data;
});

export const createidentificationType = createAsyncThunk('identificationType/createIdentificationType', async (newSeller) => {
  const response = await identificationTypeService.createIdentificationType(newSeller);
  return response.data.data;
});

export const updateidentificationType = createAsyncThunk('identificationType/updateIdentificationType', async ({ id, updatedSeller }) => {
  const response = await identificationTypeService.updateIdentificationType(id, updatedSeller);
  return response.data.data;
});

export const deleteidentificationType = createAsyncThunk('identificationType/deleteIdentificationType', async (id) => {
  await identificationTypeService.deleteIdentificationType(id);
  return id;
});


const identificationTypeSlice = createSlice({
  name: 'identificationTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchidentificationTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchidentificationTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.identificationTypes = action.payload;
      })
      .addCase(fetchidentificationTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar vendedores';
      })
      .addCase(createidentificationType.pending, (state) => {
        state.loading = true;
      })
      .addCase(createidentificationType.fulfilled, (state, action) => {
        state.loading = false;
        state.identificationTypes.push(action.payload);
      })
      .addCase(createidentificationType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al crear tipo de identificación';
      })
      .addCase(updateidentificationType.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateidentificationType.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.identificationTypes.findIndex(identificationType => identificationType._id === action.payload.id);
        if (index >= 0) {
          state.identificationTypes[index] = action.payload;
        }
      })
      .addCase(updateidentificationType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar tipo de identificación';
      })
      .addCase(deleteidentificationType.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteidentificationType.fulfilled, (state, action) => {
        state.loading = false;
        state.identificationTypes = state.identificationTypes.filter(identificationType => identificationType._id !== action.payload);
      })
      .addCase(deleteidentificationType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al eliminar tipo de identificación';
      });
  }
});

export default identificationTypeSlice.reducer;