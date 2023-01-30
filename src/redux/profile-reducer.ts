import {ActionsType} from './store';
import {v1} from 'uuid';


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
            const stateCopy = {...state};
            const newPost = stateCopy.newPostText;
            stateCopy.posts = [...state.posts];
            stateCopy.posts.unshift({id: v1(), message: newPost, likesCount: 0});
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case 'UPDATE-NEW-POST-TEXT': {
            const stateCopy = {...state};
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
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