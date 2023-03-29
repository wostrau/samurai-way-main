import {AppThunkType, InferActionsType} from './redux-store'
import {getAuthUserData} from './auth-reducer'

const initialState = {initialized: false}

export const appReducer = (state: LocalAppStateType = initialState, action: AppReducerActionsType): LocalAppStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZED':
            return {...state, initialized: true}
        default:
            return state
    }
}

export const appAction = {
    setInitialized: () => ({type: 'APP/SET-INITIALIZED'} as const)
}

export const initializeApp = (): LocalAppThunkType => {
    return async (dispatch) => {
        await dispatch(getAuthUserData())
        dispatch(appAction.setInitialized())
    }
}

export type LocalAppStateType = typeof initialState
export type AppReducerActionsType = InferActionsType<typeof appAction>
type LocalAppThunkType = AppThunkType<AppReducerActionsType>
