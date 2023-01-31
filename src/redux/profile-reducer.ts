import {v1} from 'uuid';
import {ActionsType} from './redux-store';


const initialState =  {
    posts: [
        {id: '1', message: 'Hi, how are you?', likesCount: 5},
        {id: '2', message: 'It\'s my first post!', likesCount: 7}
    ],
    newPostText: '',
} as ProfilePageType;

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsType) => {
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
export type ProfilePageType = {
    posts: Array<{
        id: string,
        message: string,
        likesCount: number
    }>,
    newPostText: string
};