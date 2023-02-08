import {AppActionsType} from './redux-store';
import {getAuthUserData} from './auth-reducer';

const initialState = {initialized: false};

export const appReducer = (state: AppType = initialState, action: AppActionsType): AppType => {
    switch (action.type) {
        case 'SET-INITIALIZED':
            return {...state, initialized: true};
        default:
            return state;
    }
};

export const setInitializedAC = () => ({type: 'SET-INITIALIZED'} as const);

//thunks
export const initializeApp = () => {
    return async (dispatch: any) => {
        await dispatch(getAuthUserData());
        dispatch(setInitializedAC());
    };
};

//types
export type AppType = { initialized: boolean };
export type AppReducerActionsType = ReturnType<typeof setInitializedAC>;