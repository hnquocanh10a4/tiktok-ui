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
        editProfileForm: false,
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
        openEditProfileForm: (state, action) => {
            state.editProfileForm = true;
        },
        closeEditProfileForm: (state, action) => {
            state.editProfileForm = false;
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
            })
            // .addCase(updateUserAction.fulfilled, (state, action) => {
            //     console.log('user hien tai update', action.payload.data.data);

            //     state.userLogin = action.payload;
            // })
            .addCase(getCurrentUserAction.fulfilled, (state, action) => {
                console.log('user hien tai', JSON.stringify(action.payload.data.data));
                localStorage.setItem(USER_LOGIN, JSON.stringify(action.payload.data.data));
                state.userLogin = action.payload.data.data;
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
    // await window.location.reload();
    return result;
});

export const logOut = createAsyncThunk('authentication/logOut', async () => {
    await authService.logOut();
    window.location.reload();
});

export const updateUserAction = createAsyncThunk('authentication/updateUserAction', async (data, thunkAPI) => {
    await authService.updateUser(data);
    thunkAPI.dispatch(getCurrentUserAction());
});

export const getCurrentUserAction = createAsyncThunk('authentication/getCurrentUserAction', async () => {
    const result = await authService.getCurrentUser();
    return result;
});

export default authenticationSlice;
