import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '~/services/userService';

const userSlice = createSlice({
    name: 'profile',
    initialState: {
        userProfile: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        });
    },
});

export const getUserProfile = createAsyncThunk('profile/getUserProfile', async (name) => {
    const result = await userService.getUsertByUserName(name);
    return result;
});

export default userSlice;
