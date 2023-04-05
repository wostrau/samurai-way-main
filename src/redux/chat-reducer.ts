import {chatAPI, ChatMessageType, StatusType} from '../api/chat-api'
import {AppThunkType, InferActionsType} from './redux-store'
import {Dispatch} from 'redux'

//initial state
const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

//reducer
export const chatReducer = (state = initialState, action: ChatActionsType): initialStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        case 'CHAT/STATUS_CHANGED':
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

//actions
export const chatActions = {
    messagesReceived: (messages: ChatMessageType[]) => {
        return {type: 'CHAT/MESSAGES_RECEIVED', payload: {messages}} as const
    },
    statusChanged: (status: StatusType) => {
        return {type: 'CHAT/STATUS_CHANGED', payload: {status}} as const
    }
}

//thunks
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(chatActions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _changedStatusHandler: ((status: StatusType) => void) | null = null
const changeStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_changedStatusHandler === null) {
        _changedStatusHandler = (status: StatusType) => {
            dispatch(chatActions.statusChanged(status))
        }
    }
    return _changedStatusHandler
}

export const startListeningMessages = (): ChatThunkType => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscribe('status-changed', changeStatusHandlerCreator(dispatch))
    }
}

export const stopListeningMessages = (): ChatThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe('status-changed', changeStatusHandlerCreator(dispatch))
    }
}

export const sendMessage = (message: string): ChatThunkType => {
    return async () => chatAPI.sendMessage(message)
}

//types
type initialStateType = typeof initialState
type ChatActionsType = InferActionsType<typeof chatActions>
type ChatThunkType = AppThunkType<ChatActionsType>