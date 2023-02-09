import {v1} from 'uuid';
import {AppActionsType} from './redux-store';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/api';


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
        case 'DELETE-POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.id)};
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

export const deletePostAC = (id: string) => ({type: 'DELETE-POST', id: id} as const);
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
