let rerenderEntireTree = (state: StateType) => {
    console.log(state);
};

export type StateType = {
    profilePage: {
        posts: Array<{
            id: number,
            message: string,
            likesCount: number
        }>,
        newPostText: string
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
        ],
        newPostText: ''
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
    },
};

export const addPost = () => {
    const newPost = {
        id: 3,
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.unshift(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
};

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
};

export const subscribe = (observer: any) => {
    rerenderEntireTree = observer;
};