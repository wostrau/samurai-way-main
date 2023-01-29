import {ActionsType} from './state';
import {ProfilePageType} from '../components/Profile/Profile';

export const profileReducer = (state: ProfilePageType, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-POST': {
            const stateCopy = state;
            const newPost = state.newPostText;
            stateCopy.posts.unshift({id: 3, message: newPost, likesCount: 0});
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case 'UPDATE-NEW-POST-TEXT': {
            const stateCopy = state;
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