import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as videoService from '~/services/videoService';
import * as likeService from '~/services/likeService';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        videoList: [],
        volume: 0,
    },
    reducers: {
        setVolume: (state, action) => {
            console.log(' action.payload', action.payload);
            state.volume = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideolist.fulfilled, (state, action) => {
                state.videoList = [
                    ...state.videoList,
                    ...action.payload.filter((item) => !state.videoList.some((a) => a.id === item.id)),
                ];
            })
            .addCase(likeAction.fulfilled, (state, action) => {
                // console.log([...state.videoList, action.payload], 'kq');
                console.log(action.payload.data, 'kq');
                console.log(state.videoList, 'kqVideo');

                const index = state.videoList.findIndex((item) => item.uuid === action.payload.data.uuid);
                state.videoList[index] = action.payload.data;
            })
            .addCase(unlikeAction.fulfilled, (state, action) => {
                // console.log([...state.videoList, action.payload], 'kq');
                console.log(action.payload.data, 'kq');
                console.log(state.videoList, 'kqVideo');

                const index = state.videoList.findIndex((item) => item.uuid === action.payload.data.uuid);
                state.videoList[index] = action.payload.data;
            });
    },
});

export const getVideolist = createAsyncThunk('home/getVideolist', async (page) => {
    const result = await videoService.getVideolist(page);
    console.log('da goi lai', result);
    return result;
});

export const likeAction = createAsyncThunk('home/likeAction', async (id, thunkApi) => {
    const result = await likeService.like(id);
    return result;
});

export const unlikeAction = createAsyncThunk('home/unlikeAction', async (id, thunkApi) => {
    const result = await likeService.unlike(id);
    return result;
});

export default homeSlice;
