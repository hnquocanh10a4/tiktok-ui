import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '~/components/Search/searchSlice.js';
import sideBarSlice from '~/layouts/component/SideBar/sideBarSlice';
import homeSlice from '~/pages/Home/homeSlice';

const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        sideBar: sideBarSlice.reducer,
        home: homeSlice.reducer,
    },
});

export default store;
