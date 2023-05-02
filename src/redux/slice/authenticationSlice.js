import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOKEN, USER_LOGIN } from '~/untils/setting/configs';
import * as authService from '~/services/authService';

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        userLogin: user,
        popUpForm: false,
        loginForm: true,
    },
    reducers: {
        openpopUpForm: (state, action) => {
            state.popUpForm = true;
        },
        closepopUpForm: (state, action) => {
            state.popUpForm = false;
        },
        openLoginForm: (state, action) => {
            state.loginForm = true;
        },
        openRegisterForm: (state, action) => {
            state.loginForm = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                localStorage.setItem(USER_LOGIN, JSON.stringify(action.payload.data));
                localStorage.setItem(TOKEN, `Bearer ${action.payload.meta.token}`);
                state.userLogin = action.payload.data;
                state.popUpForm = false;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                if (action.payload !== undefined) {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    // state.popUpForm = false;
                    // authenticationSlice.actions.openLoginForm();
                }
            })
            .addCase(logOut.fulfilled, (state, action) => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                state.userLogin = {};
            });
    },
});

export const signIn = createAsyncThunk('authentication/signIn', async (data) => {
    const result = await authService.signIn(data);
    return result;
});

export const signUp = createAsyncThunk('authentication/signUp', async (data, thunkAPI) => {
    const result = await authService.signUp({ ...data, type: 'email' });
    thunkAPI.dispatch(authenticationSlice.actions.openLoginForm());
    return result;
});

export const logOut = createAsyncThunk('authentication/logOut', async () => {
    await authService.logOut();
    window.location.reload();
});

export default authenticationSlice;
