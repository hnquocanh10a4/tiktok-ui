import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: {
        loading: false,
    },
    reducers: {
        showLoading: (state, action) => {
            state.loading = true;
        },

        hiddenLoading: (state, action) => {
            state.loading = false;
        },
    },
});

export default loadingSlice;
