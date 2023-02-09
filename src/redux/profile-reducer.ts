import {v1} from 'uuid';
import {AppActionsType} from './redux-store';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/api';

//state
const initialState = {
    posts: [
        {id: '1', message: 'Hi, how are you?', likesCount: 5},
        {id: '2', message: 'It\'s my first post!', likesCount: 7}
    ] as Array<PostType>,
    profile: {} as ProfileResponseType,
    status: ''
};

//reducer
export const profileReducer = (state: ProfilePageType = initialState, action: AppActionsType): ProfilePageType => {
    switch (action.type) {
        case 'profile/ADD-POST': {
            const newPost = {id: v1(), message: action.newPostText, likesCount: 0};
            return {...state, posts: [newPost, ...state.posts]};
        }
        case 'profile/DELETE-POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.id)};
        case 'profile/SET-USER-PROFILE':
            return {...state, profile: action.profile};
        case 'profile/SET-USER-STATUS':
            return {...state, status: action.status};
        default:
            return state;
    }
};

//actions
export const addPostAC = (newPostText: string) => ({type: 'profile/ADD-POST', newPostText} as const);
export const deletePostAC = (id: string) => ({type: 'profile/DELETE-POST', id} as const);
export const setUserProfileAC = (profile: ProfileResponseType) => ({
    type: 'profile/SET-USER-PROFILE',
    profile
} as const);
export const setUserStatusAC = (status: string) => ({type: 'profile/SET-USER-STATUS', status} as const);

//thunks
export const getUserProfile = (id: string) => {
    return async (dispatch: Dispatch) => {
        const data = await profileAPI.getUserProfile(id);
        dispatch(setUserProfileAC(data));
    };
};
export const getUserStatus = (id: string) => {
    return async (dispatch: Dispatch) => {
        const data = await profileAPI.getUserStatus(id);
        dispatch(setUserStatusAC(data));
    };
};
export const updateUserStatus = (status: string) => {
    return async (dispatch: Dispatch) => {
        const data = await profileAPI.updateUserStatus(status);
        if (data.resultCode === 0) dispatch(setUserStatusAC(status));
    };
};

//types
export type ProfileReducerActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setUserStatusAC>;
export type PostType = {
    id: string,
    message: string,
    likesCount: number
};
export type ProfilePageType = typeof initialState;
export type ProfileResponseType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: {
        github: string,
        vk: string,
        facebook: string,
        instagram: string,
        twitter: string,
        website: string,
        youtube: string,
        mainLink: string
    },
    photos: { small: string, large: string }
};
