import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '~/services/userService';

const userSlice = createSlice({
    name: 'profile',
    initialState: {
        userProfile: {},
        videoLikedList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            .addCase(getVideoLikedlistAction.fulfilled, (state, action) => {
                state.videoLikedList = action.payload;
            });
    },
});

export const getUserProfile = createAsyncThunk('profile/getUserProfile', async (name) => {
    const result = await userService.getUsertByUserName(name);
    return result;
});

export const getVideoLikedlistAction = createAsyncThunk('profile/getVideoLikedlistAction', async (idUser) => {
    const result = await userService.getVideoLikedlist(idUser);
    return result;
});

export default userSlice;
