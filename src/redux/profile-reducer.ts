import {v1} from 'uuid';
import {AppActionsType, AppDispatch} from './redux-store';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

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
        case 'profile/SAVE-USER-PHOTO':
            return {...state, profile: {...state.profile, photos: action.photos}};
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
export const saveUserPhotoAC = (photos: { large: string, small: string }) => ({
    type: 'profile/SAVE-USER-PHOTO',
    photos
} as const);

//thunks
export const getUserProfile = (id: string) => {
    return async (dispatch: AppDispatch) => {
        const data = await profileAPI.getUserProfile(id);
        dispatch(setUserProfileAC(data));
    };
};
export const getUserStatus = (id: string) => {
    return async (dispatch: AppDispatch) => {
        const data = await profileAPI.getUserStatus(id);
        dispatch(setUserStatusAC(data));
    };
};
export const updateUserStatus = (status: string) => {
    return async (dispatch: AppDispatch) => {
        const data = await profileAPI.updateUserStatus(status);
        if (data.resultCode === 0) dispatch(setUserStatusAC(status));
    };
};
export const savePhoto = (photo: File) => {
    return async (dispatch: AppDispatch) => {
        const data = await profileAPI.savePhoto(photo);
        if (data.resultCode === 0) dispatch(saveUserPhotoAC(data));
    };
};
export const saveProfile = (profile: ProfileResponseType) => {
    return async (dispatch: AppDispatch) => {
        const data = await profileAPI.saveProfile(profile);
        if (data.resultCode === 0) {
            dispatch(setUserProfileAC(profile));
        } else {
            const errorMessage = data.messages.length > 0
                ? data.messages[0]
                : 'some error';
            dispatch(stopSubmit('edit-profile', {_error: errorMessage}));
            return Promise.reject(errorMessage);
        }
    };
};

//types
export type ProfileReducerActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setUserStatusAC>
    | ReturnType<typeof saveUserPhotoAC>;
export type PostType = {
    id: string,
    message: string,
    likesCount: number
};
export type ProfilePageType = typeof initialState;
export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
};
export type ProfileResponseType = {
    userId: number,
    aboutMe?: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: { small: string, large: string }
};