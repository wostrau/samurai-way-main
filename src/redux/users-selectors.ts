import {AppStateType} from './redux-store';

export const selectUsers = (state: AppStateType) => state.usersPage.users;
export const selectPageSize = (state: AppStateType) => state.usersPage.pageSize;
export const selectTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount;
export const selectCurrentPage = (state: AppStateType) => state.usersPage.currentPage;
export const selectIsFetching = (state: AppStateType) => state.usersPage.isFetching;
export const selectFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress;
export const selectFilter = (state: AppStateType) => state.usersPage.filter;
