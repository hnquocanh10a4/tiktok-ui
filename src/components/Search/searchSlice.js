import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as searchService from '~/services/searchService';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchResults: [],
        showLoading: false,
    },
    reducers: {
        clearSearchResults: (state, action) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(search.pending, (state, action) => {
                state.showLoading = true;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.showLoading = false;
            });
    },
});

export const search = createAsyncThunk('search/getSearchResults', async (searchValue) => {
    const result = await searchService.search(searchValue);
    return result;
});

export default searchSlice;
