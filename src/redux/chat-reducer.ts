import {chatAPI, ChatMessageType} from '../api/chat-api'
import {AppThunkType, InferActionsType} from './redux-store'
import {Dispatch} from 'redux'

//initial state
const initialState = {
    messages: [] as ChatMessageType[]
}

//reducer
export const chatReducer = (state = initialState, action: ChatActionsType): initialStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        default:
            return state
    }
}

//actions
export const chatActions = {
    messagesReceived: (messages: ChatMessageType[]) => {
        return {type: 'CHAT/MESSAGES_RECEIVED', payload: {messages}} as const
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

export const startListeningMessages = (): ChatThunkType => {
    return async (dispatch) => {
        chatAPI.subscribe(newMessageHandlerCreator(dispatch))
    }
}

export const stopListeningMessages = (): ChatThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    }
}


//types
type initialStateType = typeof initialState
type ChatActionsType = InferActionsType<typeof chatActions>
type ChatThunkType = AppThunkType<ChatActionsType>