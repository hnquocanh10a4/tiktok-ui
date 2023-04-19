import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from '~/components/PopUp/authenticationSlice';
import searchSlice from '~/components/Search/searchSlice.js';
import sideBarSlice from '~/layouts/component/SideBar/sideBarSlice';
import homeSlice from '~/pages/Home/homeSlice';
import profileSlice from '~/pages/Profile/profileSlice';

const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        sideBar: sideBarSlice.reducer,
        home: homeSlice.reducer,
        authentication: authenticationSlice.reducer,
        profile: profileSlice.reducer,
    },
});

export default store;
