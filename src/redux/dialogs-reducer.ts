import {ActionsType} from './state';
import {DialogsPageType} from '../components/Dialogs/Dialogs';

export const dialogsReducer = (state: DialogsPageType, action: ActionsType) => {
    switch (action.type) {
        case 'SEND-MESSAGE': {
            const stateCopy = state;
            const newMessage = state.newMessageBody;
            stateCopy.messages.push({id: 5, message: newMessage});
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