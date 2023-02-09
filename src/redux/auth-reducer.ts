import {AppActionsType} from './redux-store';
import {Dispatch} from 'redux';
import {authAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

export const authReducer = (state: AuthType = initialState, action: AppActionsType): AuthType => {
    switch (action.type) {
        case 'auth/SET-USER-DATA':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export const setUserAuthDataAC = ({userId, email, login, isAuth}: AuthType) => ({
    type: 'auth/SET-USER-DATA',
    payload: {userId, email, login, isAuth}
} as const);

//thunks
export const getAuthUserData = () => {
    return async (dispatch: Dispatch) => {
        const data = await authAPI.me()
        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setUserAuthDataAC({userId: id, email, login, isAuth: true}));
        }
    };
};

export const login = (email: string, password: string, rememberMe: boolean) => {
    return async (dispatch: any) => {
        const data = await authAPI.login(email, password, rememberMe);
        if (data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            const errorMessage = data.messages.length > 0
                ? data.messages[0]
                : 'some error';
            dispatch(stopSubmit('login', {_error: errorMessage}));
        }
    };
};
export const logout = () => {
    return async (dispatch: Dispatch) => {
        const data = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(setUserAuthDataAC({userId: null, email: null, login: null, isAuth: false}));
        }
    };
};

//types
export type AuthType = {
    userId: null | string
    email: null | string
    login: null | string
    isAuth: boolean
};
export type AuthReducerActionsType =
    ReturnType<typeof setUserAuthDataAC>;
