import {AppActionsType} from './redux-store';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

export const authReducer = (state: AuthType = initialState, action: AppActionsType): AuthType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {...state, ...action.data};
        default:
            return state;
    }
};

export const setUserData = ({userId, email, login, isAuth}: AuthType) => ({type: 'SET-USER-DATA', data: {
        userId: userId,
        email: email,
        login: login,
        isAuth: isAuth,
    }} as const);

export type AuthType = {
    userId: null | string
    email: null | string
    login: null | string
    isAuth: boolean
};
export type AuthReducerActionsType =
    ReturnType<typeof setUserData>;
