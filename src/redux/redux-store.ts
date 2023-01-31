import {combineReducers, createStore} from 'redux';
import {profileReducer, ProfileReducerActionsType} from './profile-reducer';
import {dialogsReducer, DialogsReducerActionsType} from './dialogs-reducer';
import {usersReducer, UsersReducerActionsType} from './users-reducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
});

export const store = createStore(rootReducer);
export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType = DialogsReducerActionsType | ProfileReducerActionsType | UsersReducerActionsType;