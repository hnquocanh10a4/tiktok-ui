import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOKEN, USER_LOGIN } from '~/untils/setting/configs';
import * as authService from '~/services/authService';

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const authenticationSlice = createSlice({
    name: 'signIn',
    initialState: {
        userLogin: user,
        loginForm: false,
    },
    reducers: {
        openLoginForm: (state, action) => {
            state.loginForm = true;
        },
        closeLoginForm: (state, action) => {
            state.loginForm = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.payload.data));
            localStorage.setItem(TOKEN, `Bearer ${action.payload.meta.token}`);
            state.userLogin = action.payload.data;
        });
    },
});

export const signIn = createAsyncThunk('signIn/signIn', async (data) => {
    const result = await authService.signIn(data);
    return result;
});

export default authenticationSlice;
