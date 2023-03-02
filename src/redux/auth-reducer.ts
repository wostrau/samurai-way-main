import {AppActionsType, AppDispatch, AppStateType, AppThunkType, InferActionsType} from './redux-store'
import {ResultCodes} from '../api/api'
import {stopSubmit} from 'redux-form'
import {authAPI} from '../api/auth-api'
import {securityAPI} from '../api/security-api'
import {ThunkDispatch} from 'redux-thunk'
import {FormAction} from 'redux-form/lib/actions'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
} as AuthStateType

export const authReducer = (state: AuthStateType = initialState, action: AuthReducerActionsType): AuthStateType => {
    switch (action.type) {
        case 'AUTH/SET-USER-DATA':
        case 'AUTH/SET-CAPTCHA-URL':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const authActions = {
    setUserAuthData: ({userId, email, login, isAuth}: AuthStateType) => ({
        type: 'AUTH/SET-USER-DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    setCaptcha: (captchaUrl: string) => ({type: 'AUTH/SET-CAPTCHA-URL', payload: {captchaUrl}} as const)
}

export const getAuthUserData = (): AuthThunkType => {
    return async (dispatch) => {
        const data = await authAPI.me()
        if (data.resultCode === ResultCodes.Success) {
            const {id, email, login} = data.data
            dispatch(authActions.setUserAuthData({userId: id, email, login, isAuth: true}))
        }
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha?: string): AuthThunkType => {
    return async (dispatch) => {
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
export const logout = (): AuthThunkType => {
    return async (dispatch) => {
        const data = await authAPI.logout()
        if (data.resultCode === ResultCodes.Success) {
            dispatch(authActions.setUserAuthData({userId: null, email: null, login: null, isAuth: false}))
        }
    }
}
export const getCaptcha = (): AuthThunkType => {
    return async (dispatch) => {
        const data = await securityAPI.getCaptchaUrl()
        dispatch(authActions.setCaptcha(data.url))
    }
}


export type AuthStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    captchaUrl?: null | string
}
export type AuthReducerActionsType = InferActionsType<typeof authActions>
type AuthThunkType = AppThunkType<AuthReducerActionsType | FormAction>
