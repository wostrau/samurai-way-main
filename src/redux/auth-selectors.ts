import {AppStateType} from './redux-store'

export const selectIsAuth = (state: AppStateType) => {
}

export const selectLogin = (state: AppStateType) => {
    return state.auth.login
}