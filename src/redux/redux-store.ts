import {applyMiddleware, combineReducers, createStore} from 'redux';
import {profileReducer, ProfileReducerActionsType} from './profile-reducer';
import {dialogsReducer, DialogsReducerActionsType} from './dialogs-reducer';
import {usersReducer, UsersReducerActionsType} from './users-reducer';
import {authReducer, AuthReducerActionsType} from './auth-reducer';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {appReducer, AppReducerActionsType} from './app-reducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType =
    DialogsReducerActionsType
    | ProfileReducerActionsType
    | UsersReducerActionsType
    | AuthReducerActionsType
    | AppReducerActionsType;