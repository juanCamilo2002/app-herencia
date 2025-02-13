import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authService";

// Inicialización de estado
const storedToken = localStorage.getItem("accessToken");
const initialState = storedToken
  ? {
      isAuthenticated: true,
      accessToken: storedToken,
      loading: false,
      error: null,
      userProfile: null, // Nueva propiedad para el perfil del usuario
    }
  : {
      isAuthenticated: false,
      accessToken: null,
      loading: false,
      error: null,
      userProfile: null,
    };

// `createAsyncThunk` para login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem("accessToken", data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al hacer login"
      );
    }
  }
);

// `createAsyncThunk` para registro
export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.register(email, password);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al registrar"
      );
    }
  }
);

// `createAsyncThunk` para logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem("accessToken");
    } catch (error) {
      return rejectWithValue("Error al cerrar sesión");
    }
  }
);

// `createAsyncThunk` para obtener el perfil del usuario
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.profile();
      return data;
    } catch (error) {
      return rejectWithValue("Error al obtener el perfil del usuario");
    }
  }
);

// Reducer y slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Reseteamos el error al iniciar el login
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.error = null; // Limpiamos el error si el login es exitoso
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null; // Reseteamos el error al iniciar el registro
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.error = null; // Limpiamos el error si el registro es exitoso
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.error = null; // Limpiamos el error al hacer logout
        state.userProfile = null; // Limpiamos el perfil al hacer logout
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Reseteamos el error al obtener el perfil
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload; // Guardamos el perfil
        state.error = null; // Limpiamos el error si se obtiene el perfil
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Si hay error, lo asignamos
      });
  },
});

export default authSlice.reducer;
