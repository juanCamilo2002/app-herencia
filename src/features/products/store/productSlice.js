import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../services/productServices";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ queryParams = {} }) => {
    const response = await productService.fetchProduts(queryParams);
    return response.data.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProducts",
  async (newProduct) => {
    const response = await productService.createProduct(newProduct);
    return response.data.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updatePorduct",
  async ({ id, updatedProduct }) => {
    const response = await productService.updateProduct(id, updatedProduct);
    return response.data.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deletePorduct",
  async (id) => {
    await productService.deleteProduct(id);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar productos";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al crear producto";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index >= 0) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al actualizar producto";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al eliminar producto";
      });
  },
});

export default productSlice.reducer;
