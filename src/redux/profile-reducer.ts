import {v1} from 'uuid';
import {AppActionsType} from './redux-store';


const initialState = {
    posts: [
        {id: '1', message: 'Hi, how are you?', likesCount: 5},
        {id: '2', message: 'It\'s my first post!', likesCount: 7}
    ] as Array<PostType>,
    newPostText: '',
};

export const profileReducer = (state: ProfilePageType = initialState, action: AppActionsType): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {id: v1(), message: state.newPostText, likesCount: 0};
            return {...state, posts: [newPost, ...state.posts], newPostText: ''};
        }
        case 'UPDATE-NEW-POST-TEXT':
            return {...state, newPostText: action.newText};
        default:
            return state;
    }
};

export const addPostAC = () => ({type: 'ADD-POST'} as const);
export const updateNewPostTextAC = (newText: string) => ({type: 'UPDATE-NEW-POST-TEXT', newText: newText} as const);

export type ProfileReducerActionsType = ReturnType<typeof addPostAC> | ReturnType<typeof updateNewPostTextAC>;
export type PostType = {
    id: string,
    message: string,
    likesCount: number
};
export type ProfilePageType = typeof initialState;