import {AppActionsType} from './redux-store';
import {usersAPI} from '../api/api';
import {Dispatch} from 'redux';


const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: ['']
};

export const usersReducer = (state: UsersPageType = initialState, action: AppActionsType): UsersPageType => {
    switch (action.type) {
        case 'SET-USERS':
            return {...state, users: action.users};
        case 'FOLLOW-USER':
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: true} : u)};
        case 'UNFOLLOW-USER':
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: false} : u)};
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage};
        case 'SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalUsersCount};
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching};
        case 'TOGGLE-IS-FOLLOWING-PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            };
        default:
            return state;
    }
};

export const setUsers = (users: Array<UserType>) => ({type: 'SET-USERS', users: users} as const);
export const followUser = (id: string) => ({type: 'FOLLOW-USER', id: id} as const);
export const unfollowUser = (id: string) => ({type: 'UNFOLLOW-USER', id: id} as const);
export const setCurrentPage = (currentPage: number) => ({
    type: 'SET-CURRENT-PAGE',
    currentPage: currentPage
} as const);
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: 'SET-TOTAL-USERS-COUNT',
    totalUsersCount: totalUsersCount
} as const);
export const toggleIsFetching = (isFetching: boolean) => ({
    type: 'TOGGLE-IS-FETCHING',
    isFetching: isFetching
} as const);
export const toggleFollowingInProgress = (id: string, isFetching: boolean) => ({
    type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
    id: id,
    isFetching: isFetching,
} as const);

export const getUsersTC = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    };
};
export const followUserTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingInProgress(id, true));
        usersAPI.followUser(id)
            .then(data => {
                if (data.resultCode === 0) dispatch(followUser(id));
                dispatch(toggleFollowingInProgress(id, false));
            });
    };
};
export const unfollowUserTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingInProgress(id, true));
        usersAPI.unfollowUser(id)
            .then(data => {
                if (data.resultCode === 0) dispatch(unfollowUser(id));
                dispatch(toggleFollowingInProgress(id, false));
            });
    };
};

export type UserType = {
    id: string,
    name: string,
    uniqueUrlName: string
    photos: {
        small: string
        large: string
    }
    status: string
    followed: boolean
};
export type UsersPageType = typeof initialState;
export type UsersReducerActionsType =
    ReturnType<typeof setUsers>
    | ReturnType<typeof followUser>
    | ReturnType<typeof unfollowUser>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingInProgress>;
