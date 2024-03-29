import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from '~/redux/slice/authenticationSlice';
import searchSlice from '~/redux/slice/searchSlice.js';
import sideBarSlice from '~/redux/slice/sideBarSlice';
import homeSlice from '~/redux/slice/homeSlice';
import userSlice from '~/redux/slice/userSlice';
import followingSlice from './slice/followingSlice';
import commentSlice from './slice/commentSlice';
import loadingSlice from './slice/loadingSlice';
import uploadSlice from './slice/uploadSlice';

const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        sideBar: sideBarSlice.reducer,
        home: homeSlice.reducer,
        authentication: authenticationSlice.reducer,
        profile: userSlice.reducer,
        following: followingSlice.reducer,
        comment: commentSlice.reducer,
        upload: uploadSlice.reducer,
        loading: loadingSlice.reducer,
    },
});

export default store;
