export const searchResultSelector = (state) => state.search.searchResults;
export const searchLoadingSelector = (state) => state.search.showLoading;
export const getSuggesedUserSelector = (state) => state.sideBar.suggesedUser;
export const getVideoListSelector = (state) => state.home.videoList;
export const getCurrentUserSelector = (state) => state.authentication.userLogin;
export const getLoginFormSelector = (state) => state.authentication.loginForm;
