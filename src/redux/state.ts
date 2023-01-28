

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
export type StoreType = {
    _state: StateType,
    getState: () => StateType,
    _callSubscriber: (state: StateType) => void,
    subscribe: (observer: any) => void,
    addPost: () => void;
    updateNewPostText: (newText: string) => void
};

export const store: StoreType = {
    _state: {
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
    } as StateType,
    getState() {
        return this._state;
    },
    _callSubscriber() {},
    subscribe(observer: any) {
        this._callSubscriber = observer;
    },
    addPost() {
        const newPost = {
            id: 3,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.posts.unshift(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
    },
    updateNewPostText (newText: string) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
};