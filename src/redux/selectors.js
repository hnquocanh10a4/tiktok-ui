export const searchResultSelector = (state) => state.search.searchResults;
export const searchLoadingSelector = (state) => state.search.showLoading;
export const getSuggesedUserSelector = (state) => state.sideBar.suggesedUser;
export const getVideoListSelector = (state) => state.home.videoList;
// export const getVideoListAllSelector = (state) => state.home.videoListAll;
export const getVolumeSelector = (state) => state.home.volume;
export const getCurrentUserSelector = (state) => state.authentication.userLogin;
export const getpopUpFormSelector = (state) => state.authentication.popUpForm;
export const getOpenLoginFormSelector = (state) => state.authentication.loginForm;
export const getUsertByUserName = (state) => state.profile.userProfile;
export const getFollowingListSelector = (state) => state.following.followingList;
export const getCommentByIdSelector = (state) => state.comment.listComment;
