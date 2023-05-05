import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as videoService from '~/services/videoService';
import { resetVideolist } from './homeSlice';

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        loading: false,
        // videoDetail: {},
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
        // .addCase(getAVideoAction.fulfilled, (state, action) => {
        //     state.videoDetail = action.payload;
        // });
    },
});

export const postVideoAction = createAsyncThunk('upload/postVideoAction', async (data, thunkApi) => {
    await videoService.postVideo(data);
    thunkApi.dispatch(resetVideolist());
});

export const deleteVideoAction = createAsyncThunk('upload/deleteVideoAction', async (id, thunkApi) => {
    await videoService.deleteVideo(id);
    thunkApi.dispatch(resetVideolist());
});

// export const getAVideoAction = createAsyncThunk('upload/getAVideoAction', async (uuid) => {
//     const result = await videoService.getAVideo(uuid);
//     return result;
// });

export default uploadSlice;
