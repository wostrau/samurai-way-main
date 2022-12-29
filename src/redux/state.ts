import {rerenderEntireTree} from './render';

export type StateType = {
    profilePage: {
        posts: Array<{
            id: number,
            message: string,
            likesCount: number
        }>
    },
    dialogsPage: {
        dialogs: Array<{
            id: number,
            name: string
        }>,
        messages: Array<{
            id: number,
            message: string
        }>
    }
};

export const state: StateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 5},
            {id: 2, message: 'It\'s my first post!', likesCount: 7}
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'DIMYCH'},
            {id: 2, name: 'ANDREW'}
        ],
        messages: [
            {id: 1, message: 'Hi, how are you?'},
            {id: 2, message: 'I\'m fine, thanks'},
            {id: 3, message: 'What are your plans?'},
            {id: 4, message: 'Go for a walk this evening'}
        ]
    }
};

export const addPost = (post: string) => {
    const newPost = {
        id: 3,
        message: post,
        likesCount: 0
    };
    state.profilePage.posts.unshift(newPost);
    rerenderEntireTree(state);
}