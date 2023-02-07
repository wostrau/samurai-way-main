import {v1} from 'uuid';
import {AppActionsType} from './redux-store';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/api';
import {ProfileResponseType} from '../components/Profile/ProfileContainer';


const initialState = {
    posts: [
        {id: '1', message: 'Hi, how are you?', likesCount: 5},
        {id: '2', message: 'It\'s my first post!', likesCount: 7}
    ] as Array<PostType>,
    profile: {} as ProfileResponseType,
    status: ''
};

export const profileReducer = (state: ProfilePageType = initialState, action: AppActionsType): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {id: v1(), message: action.newPostText, likesCount: 0};
            return {...state, posts: [newPost, ...state.posts]};
        }
        case 'SET-USER-PROFILE':
            return {...state, profile: action.profile};
        case 'SET-USER-STATUS':
            return {...state, status: action.status};
        default:
            return state;
    }
};

export const addPostAC = (newPostText: string) => ({type: 'ADD-POST', newPostText: newPostText} as const);
export const setUserProfileAC = (profile: ProfileResponseType) => ({
    type: 'SET-USER-PROFILE',
    profile: profile
} as const);
export const setUserStatusAC = (status: string) => ({type: 'SET-USER-STATUS', status: status} as const);

export const getUserProfile = (id: string) => {
    return (dispatch: Dispatch) => {
        profileAPI
            .getUserProfile(id)
            .then(data => dispatch(setUserProfileAC(data)));
    };
};
export const getUserStatus = (id: string) => {
    return (dispatch: Dispatch) => {
        profileAPI
            .getUserStatus(id)
            .then(data => dispatch(setUserStatusAC(data)));
    };
};
export const updateUserStatus = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI
            .updateUserStatus(status)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setUserStatusAC(status));
                }
            });
    };
};

export type ProfileReducerActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setUserStatusAC>;
export type PostType = {
    id: string,
    message: string,
    likesCount: number
};
export type ProfilePageType = typeof initialState;