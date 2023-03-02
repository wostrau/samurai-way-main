import {v1} from 'uuid'
import {AppActionsType, InferActionsType} from './redux-store'

const initialState = {
    dialogs: [
        {id: 1, name: 'DIMYCH'},
        {id: 2, name: 'ANDREW'},
        {id: 3, name: 'CORY'},
        {id: 4, name: 'SUSAN'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi, how are you?'},
        {id: 2, message: 'I\'m fine, thanks'},
        {id: 3, message: 'What are your plans?'},
        {id: 4, message: 'Go for a walk this evening'}
    ] as Array<MessageType>
}

export const dialogsReducer = (state: DialogsStateType = initialState, action: DialogsReducerActionsType): DialogsStateType => {
    switch (action.type) {
        case 'DIALOGS/SEND-MESSAGE': {
            const newMessage = {id: Number(v1()), message: action.newMessageBody}
            return {...state, messages: [...state.messages, newMessage]}
        }
        default:
            return state
    }
}

export const dialogsAction = {
    sendMessage: (newMessageBody: string) => ({type: 'DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}

export type DialogsReducerActionsType = InferActionsType<typeof dialogsAction>;
export type DialogType = { id: number, name: string }
export type MessageType = { id: number, message: string }
export type DialogsStateType = typeof initialState