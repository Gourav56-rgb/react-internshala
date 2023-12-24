import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";

const initialState = {
    searchProducts: [],
    status: "idle"
}

export const fetchSearchProductAsync = createAsyncThunk('product-search/fetch', async(searchTerm) => {
    const response = await fetch(`${BASE_URL}products/search?q=${searchTerm}`);
    const data = await response.json();
    return data.products;
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.searchProducts = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSearchProductAsync.pending, (state) => {
            state.status = "loading";
        })

        .addCase(fetchSearchProductAsync.fulfilled, (state, action) => {
            state.searchProducts = action.payload;
            state.status = "idle";
        })

        .addCase(fetchSearchProductAsync.rejected, (state) => {
            state.status = "failed";
        })
    }
})

export const { clearSearch, setSearchTerm } = searchSlice.actions;
export const getSearchProducts = (state) => state.search.searchProducts;
export default searchSlice.reducer;