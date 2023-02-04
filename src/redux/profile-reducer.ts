import {v1} from 'uuid';
import {AppActionsType} from './redux-store';
import {Dispatch} from 'redux';
import {usersAPI} from '../api/api';


const initialState = {
    posts: [
        {id: '1', message: 'Hi, how are you?', likesCount: 5},
        {id: '2', message: 'It\'s my first post!', likesCount: 7}
    ] as Array<PostType>,
    newPostText: '',
    profile: null
};

export const profileReducer = (state: ProfilePageType = initialState, action: AppActionsType): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {id: v1(), message: state.newPostText, likesCount: 0};
            return {...state, posts: [newPost, ...state.posts], newPostText: ''};
        }
        case 'UPDATE-NEW-POST-TEXT':
            return {...state, newPostText: action.newText};
        case 'SET-USER-PROFILE':
            return {...state, profile: action.profile};
        default:
            return state;
    }
};

export const addPostAC = () => ({type: 'ADD-POST'} as const);
export const updateNewPostTextAC = (newText: string) => ({type: 'UPDATE-NEW-POST-TEXT', newText: newText} as const);
export const setUserProfileAC = (profile: any) => ({type: 'SET-USER-PROFILE', profile: profile} as const);

export const getUserProfile = (id: string) => {
    return (dispatch: Dispatch) => {
        usersAPI
            .getUserProfile(id)
            .then(data => dispatch(setUserProfileAC(data)));
    };
};

export type ProfileReducerActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUserProfileAC>;
export type PostType = {
    id: string,
    message: string,
    likesCount: number
};
export type ProfilePageType = typeof initialState;