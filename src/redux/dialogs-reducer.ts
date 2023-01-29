import {ActionsType} from './store';
import {DialogsPageType} from '../components/Dialogs/Dialogs';
import {v1} from 'uuid';

const initialState = {
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
} as DialogsPageType;

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'SEND-MESSAGE': {
            const stateCopy = state;
            const newMessage = state.newMessageBody;
            stateCopy.messages.push({id: v1(), message: newMessage});
            stateCopy.newMessageBody = '';
            return stateCopy;
        }
        case 'UPDATE-NEW-MESSAGE-BODY': {
            const stateCopy = state;
            stateCopy.newMessageBody = action.newMessage;
            return stateCopy;
        }
        default:
            return state;
    }
};

export const updateNewMessageBodyAC = (newMessage: string) => ({
    type: 'UPDATE-NEW-MESSAGE-BODY',
    newMessage: newMessage
} as const);
export const sendMessageAC = () => ({type: 'SEND-MESSAGE'} as const);

export type DialogsReducerActionsType = ReturnType<typeof updateNewMessageBodyAC> | ReturnType<typeof sendMessageAC>