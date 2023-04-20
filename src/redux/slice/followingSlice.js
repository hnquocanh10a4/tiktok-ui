import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as followingService from '~/services/followingService';

const followingSlice = createSlice({
    name: 'following',
    initialState: {
        followingList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFollowingList.fulfilled, (state, action) => {
            state.followingList = action.payload;
        });
    },
});

export const getFollowingList = createAsyncThunk('following/getFollowingList', async () => {
    let listResult = [];
    const result = await followingService.getFollowingList();

    const totalPages = result.meta.pagination.total_pages;
    for (let page = 1; page < totalPages + 1; page++) {
        const result = await followingService.getFollowingList();
        listResult = [...listResult, ...result.data];
    }
    return listResult;
});

export const followAction = createAsyncThunk('following/followAction', async (userId, thunkAPI) => {
    await followingService.follow(userId);
    await thunkAPI.dispatch(getFollowingList());
});

export const unfollowAction = createAsyncThunk('following/unfollowAction', async (userId, thunkAPI) => {
    await followingService.unfollow(userId);
    await thunkAPI.dispatch(getFollowingList());
});

export default followingSlice;
