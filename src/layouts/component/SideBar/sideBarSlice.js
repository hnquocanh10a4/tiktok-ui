import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '~/services/userService';

const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        suggesedUser: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSuggesedUser.fulfilled, (state, acction) => {
            state.suggesedUser = acction.payload;
        });
    },
});

export const getSuggesedUser = createAsyncThunk('sidebar/getSuggesedUser', async (quantity) => {
    const result = await userService.suggestAccount(quantity);
    return result;
});

export default sideBarSlice;
