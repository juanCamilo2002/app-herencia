import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { entityService }  from "../services/entityServices";

const initialState = {
    entities: [],
    loading: false,
    error: null
}

export const fetchEntities = createAsyncThunk('entities/fetchEntities', async ({queryParams ={}}) => {
    const response = await entityService.fetchEntities(queryParams);
    return response.data.data;
});

const entitySlice = createSlice({
    name: "entities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEntities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEntities.fulfilled, (state, action) => {
                state.loading = false;
                state.entities = action.payload;
            })
            .addCase(fetchEntities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error al cargar entidades";
            })
    }
});

export default entitySlice.reducer;