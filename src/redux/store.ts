import {dialogsReducer, DialogsReducerActionsType} from './dialogs-reducer';
import {profileReducer, ProfileReducerActionsType} from './profile-reducer';

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: '1', message: 'Hi, how are you?', likesCount: 5},
                {id: '2', message: 'It\'s my first post!', likesCount: 7}
            ],
            newPostText: '',
        },
        dialogsPage: {
            dialogs: [
                {id: '1', name: 'DIMYCH'},
                {id: '2', name: 'ANDREW'},
            ],
            messages: [
                {id: '1', message: 'Hi, how are you?'},
                {id: '2', message: 'I\'m fine, thanks'},
                {id: '3', message: 'What are your plans?'},
                {id: '4', message: 'Go for a walk this evening'},
            ],
            newMessageBody: '',
        },
    } as StateType,
    _callSubscriber() {
    },
    getState() {
        return this._state;
    },
    subscribe(observer: any) {
        this._callSubscriber = observer;
    },
    dispatch(action: ActionsType) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);
    }
};

export type StateType = {
    profilePage: {
        posts: Array<{
            id: string,
            message: string,
            likesCount: number
        }>,
        newPostText: string
    },
    dialogsPage: {
        dialogs: Array<{
            id: string,
            name: string
        }>,
        messages: Array<{
            id: string,
            message: string
        }>,
        newMessageBody: string
    }
};

export type StoreType = {
    _state: StateType,
    getState: () => StateType,
    _callSubscriber: (state: StateType) => void,
    subscribe: (observer: any) => void,
    dispatch: (action: ActionsType) => void;
};

export type ActionsType = DialogsReducerActionsType | ProfileReducerActionsType;
