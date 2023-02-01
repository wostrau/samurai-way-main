import {AppActionsType} from './redux-store';

export const avatarURL = 'https://manager.almadarisp.com/user/img/user.png'
const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
        default:
            return state;
    }
};

export const setUsersAC = (users: Array<UserType>) => ({type: 'SET-USERS', users: users} as const);
export const followUserAC = (id: string) => ({type: 'FOLLOW-USER', id: id} as const);
export const unfollowUserAC = (id: string) => ({type: 'UNFOLLOW-USER', id: id} as const);
export const setCurrentPageAC = (currentPage: number) => ({
    type: 'SET-CURRENT-PAGE',
    currentPage: currentPage
} as const);
export const setTotalUsersCountAC = (totalUsersCount: number) => ({
    type: 'SET-TOTAL-USERS-COUNT',
    totalUsersCount: totalUsersCount
} as const);
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching: isFetching} as const);

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
    ReturnType<typeof setUsersAC>
    | ReturnType<typeof followUserAC>
    | ReturnType<typeof unfollowUserAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleIsFetchingAC>;
