import {AppStateType} from './redux-store'

export const selectIsAuth = (state: AppStateType) => state.auth.isAuth
export const selectLogin = (state: AppStateType) => state.auth.login
