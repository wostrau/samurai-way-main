import {chatAPI, ChatMessageAPIType, StatusType} from '../api/chat-api'
import {AppThunkType, InferActionsType} from './redux-store'
import {Dispatch} from 'redux'
import {v1} from 'uuid'

//initial state
const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

//reducer
export const chatReducer = (state = initialState, action: ChatActionsType): initialStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.payload.messages
                        .map(m => ({...m, id: v1()}))
                ].filter((m, index, array) => index >= array.length - 100)
            }
        case 'CHAT/STATUS_CHANGED':
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

//actions
export const chatActions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => {
        return {type: 'CHAT/MESSAGES_RECEIVED', payload: {messages}} as const
    },
    statusChanged: (status: StatusType) => {
        return {type: 'CHAT/STATUS_CHANGED', payload: {status}} as const
    }
}

//thunks
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageAPIType[]) => {
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
type ChatMessageType = ChatMessageAPIType & { id: string }
type initialStateType = typeof initialState
type ChatActionsType = InferActionsType<typeof chatActions>
type ChatThunkType = AppThunkType<ChatActionsType>