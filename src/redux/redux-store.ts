import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {profileReducer, ProfileReducerActionsType} from './profile-reducer'
import {dialogsReducer, DialogsReducerActionsType} from './dialogs-reducer'
import {usersReducer, UsersReducerActionsType} from './users-reducer'
import {authReducer, AuthReducerActionsType} from './auth-reducer'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import {appReducer, AppReducerActionsType} from './app-reducer'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AppActionsType>
export type AppDispatch = ThunkDispatch<AppStateType, void, AppActionsType>
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    DialogsReducerActionsType
    | ProfileReducerActionsType
    | UsersReducerActionsType
    | AuthReducerActionsType
    | AppReducerActionsType
