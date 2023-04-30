import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as videoService from '~/services/videoService';

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postVideoAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(postVideoAction.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});

export const postVideoAction = createAsyncThunk('upload/postVideoAction', async (data) => {
    await videoService.postVideo(data);
});

export default uploadSlice;
