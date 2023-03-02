import {AppActionsType, AppDispatch} from './redux-store'
import {ResultCodes} from '../api/api'
import {stopSubmit} from 'redux-form'
import {authAPI} from '../api/auth-api'
import {securityAPI} from '../api/security-api'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
} as AuthType

export const authReducer = (state: AuthType = initialState, action: AppActionsType): AuthType => {
    switch (action.type) {
        case 'auth/SET-USER-DATA':
        case 'auth/SET-CAPTCHA-URL':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setUserAuthDataAC = ({userId, email, login, isAuth}: AuthType) => ({
    type: 'auth/SET-USER-DATA',
    payload: {userId, email, login, isAuth}
} as const)
export const setCaptchaAC = (captchaUrl: string) => ({type: 'auth/SET-CAPTCHA-URL', payload: {captchaUrl}} as const)

//thunks
export const getAuthUserData = () => {
    return async (dispatch: AppDispatch) => {
        const data = await authAPI.me()
        if (data.resultCode === ResultCodes.Success) {
            const {id, email, login} = data.data
            dispatch(setUserAuthDataAC({userId: id, email, login, isAuth: true}))
        }
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha?: string) => {
    return async (dispatch: AppDispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            await dispatch(getAuthUserData())
        } else {
            if (data.resultCode === ResultCodes.CaptchaIsRequired) await dispatch(getCaptcha())
            const errorMessage = data.messages.length > 0
                ? data.messages[0]
                : 'some error'
            dispatch(stopSubmit('login', {_error: errorMessage}))
        }
    }
}
export const logout = () => {
    return async (dispatch: AppDispatch) => {
        const data = await authAPI.logout()
        if (data.resultCode === ResultCodes.Success) {
            dispatch(setUserAuthDataAC({userId: null, email: null, login: null, isAuth: false}))
        }
    }
}
export const getCaptcha = () => {
    return async (dispatch: AppDispatch) => {
        const data = await securityAPI.getCaptchaUrl()
        dispatch(setCaptchaAC(data.url))
    }
}

//types
export type AuthType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    captchaUrl?: null | string
};
export type AuthReducerActionsType = ReturnType<typeof setUserAuthDataAC> | ReturnType<typeof setCaptchaAC>
