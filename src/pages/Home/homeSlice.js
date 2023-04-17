import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as videoService from '~/services/videoService';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        videoList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVideolist.fulfilled, (state, action) => {
            state.videoList = [
                ...state.videoList,
                ...action.payload.filter((item) => !state.videoList.some((a) => a.id === item.id)),
            ];
        });
    },
});

export const getVideolist = createAsyncThunk('home/getVideolist', async (page) => {
    const result = await videoService.getVideolist(page);
    return result;
});

export default homeSlice;
