import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {profileReducer, ProfileReducerActionsType} from './profile-reducer'
import {dialogsReducer, DialogsReducerActionsType} from './dialogs-reducer'
import {usersReducer, UsersReducerActionsType} from './users-reducer'
import {authReducer, AuthReducerActionsType} from './auth-reducer'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import {appReducer, AppReducerActionsType} from './app-reducer'
import {authAPI} from '../api/auth-api'
import {profileAPI} from '../api/profile-api'
import {securityAPI} from '../api/security-api'
import {usersAPI} from '../api/users-api'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

const appAPI = {authAPI, profileAPI, securityAPI, usersAPI}
const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk.withExtraArgument(appAPI))))

export type InferActionsType<T> = T extends { [key: string]: (...args: any) => infer U } ? U : never

export type AppThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, typeof appAPI, A>
export type AppDispatch = ThunkDispatch<AppStateType, typeof appAPI, AppActionsType>
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    DialogsReducerActionsType
    | ProfileReducerActionsType
    | AuthReducerActionsType
    | AppReducerActionsType
    | UsersReducerActionsType
