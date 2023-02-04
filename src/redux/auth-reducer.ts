import {AppActionsType} from './redux-store';
import {Dispatch} from 'redux';
import {authAPI} from '../api/api';

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

export const setUserAuthDataAC = ({userId, email, login, isAuth}: AuthType) => ({
    type: 'SET-USER-DATA', data: {
        userId: userId,
        email: email,
        login: login,
        isAuth: isAuth,
    }
} as const);

export const getAuthUserData = () => {
    return (dispatch: Dispatch) => {
        authAPI.me().then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data;
                dispatch(setUserAuthDataAC({userId: id, email, login, isAuth: true}));
            }
        });
    }
}

export type AuthType = {
    userId: null | string
    email: null | string
    login: null | string
    isAuth: boolean
};
export type AuthReducerActionsType =
    ReturnType<typeof setUserAuthDataAC>;
