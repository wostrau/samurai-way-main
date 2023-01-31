import {ActionsType} from './redux-store';

export const avatarURL = 'https://manager.almadarisp.com/user/img/user.png'
const initialState = {
    users: []
} as UsersPageType;

export const usersReducer = (state: UsersPageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'SET-USERS':
            return {...state, users: [...state.users, ...action.users]};
        case 'FOLLOW-USER':
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, isFollowed: true} : u)};
        case 'UNFOLLOW-USER':
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, isFollowed: false} : u)};
        default:
            return state;
    }
};

export const setUsersAC = (users: UsersType) => ({type: 'SET-USERS', users: users} as const);
export const followUserAC = (id: string) => ({type: 'FOLLOW-USER', id: id} as const);
export const unfollowUserAC = (id: string) => ({type: 'UNFOLLOW-USER', id: id} as const);

export type UsersPageType = {
    users: UsersType
};
export type UsersType = Array<{
    id: string,
    avatar: string,
    fullName: string,
    status: string
    location: {
        country: string,
        city: string
    },
    isFollowed: boolean
}>;
export type UsersReducerActionsType =
    ReturnType<typeof setUsersAC>
    | ReturnType<typeof followUserAC>
    | ReturnType<typeof unfollowUserAC>;
