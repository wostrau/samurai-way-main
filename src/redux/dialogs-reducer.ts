import {v1} from 'uuid';
import {AppActionsType} from './redux-store';

const initialState = {
    dialogs: [
        {id: '1', name: 'DIMYCH'},
        {id: '2', name: 'ANDREW'},
    ] as Array<DialogType>,
    messages: [
        {id: '1', message: 'Hi, how are you?'},
        {id: '2', message: 'I\'m fine, thanks'},
        {id: '3', message: 'What are your plans?'},
        {id: '4', message: 'Go for a walk this evening'},
    ] as Array<MessageType>,
    newMessageBody: '',
};

export const dialogsReducer = (state: DialogsPageType = initialState, action: AppActionsType): DialogsPageType => {
    switch (action.type) {
        case 'SEND-MESSAGE': {
            const newMessage = {id: v1(), message: state.newMessageBody};
            return {...state, messages: [...state.messages, newMessage], newMessageBody: ''};
        }
        case 'UPDATE-NEW-MESSAGE-BODY':
            return {...state, newMessageBody: action.newMessage};
        default:
            return state;
    }
};

export const updateNewMessageBodyAC = (newMessage: string) => ({
    type: 'UPDATE-NEW-MESSAGE-BODY',
    newMessage: newMessage
} as const);
export const sendMessageAC = () => ({type: 'SEND-MESSAGE'} as const);

export type DialogsReducerActionsType = ReturnType<typeof updateNewMessageBodyAC> | ReturnType<typeof sendMessageAC>;
export type DialogType = {
    id: string,
    name: string
};
export type MessageType = {
    id: string,
    message: string
};
export type DialogsPageType = typeof initialState;