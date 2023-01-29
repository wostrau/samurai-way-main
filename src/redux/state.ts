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
        }>,
        newMessageBody: string
    }
};
export type StoreType = {
    _state: StateType,
    getState: () => StateType,
    _callSubscriber: (state: StateType) => void,
    subscribe: (observer: any) => void,
    dispatch: (action: ActionsType) => void;
};

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 5},
                {id: 2, message: 'It\'s my first post!', likesCount: 7}
            ],
            newPostText: '',
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'DIMYCH'},
                {id: 2, name: 'ANDREW'},
            ],
            messages: [
                {id: 1, message: 'Hi, how are you?'},
                {id: 2, message: 'I\'m fine, thanks'},
                {id: 3, message: 'What are your plans?'},
                {id: 4, message: 'Go for a walk this evening'},
            ],
            newMessageBody: '',
        },
    } as StateType,
    _callSubscriber() {
    },
    getState() {
        return this._state;
    },
    subscribe(observer: any) {
        this._callSubscriber = observer;
    },
    dispatch(action: ActionsType) {
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: 3,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.unshift(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-NEW-MESSAGE-BODY') {
            this._state.dialogsPage.newMessageBody = action.newMessage;
            this._callSubscriber(this._state);
        } else if (action.type === 'SEND-MESSAGE') {
            const newMessage = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.messages.push({id: 5, message: newMessage});
            this._state.dialogsPage.newMessageBody = '';
            this._callSubscriber(this._state);
        }
    },
};

export const addPostAC = () => ({type: 'ADD-POST'} as const);
export const updateNewPostTextAC = (newText: string) => ({type: 'UPDATE-NEW-POST-TEXT', newText: newText} as const);
export const updateNewMessageBodyAC = (newMessage: string) => ({
    type: 'UPDATE-NEW-MESSAGE-BODY',
    newMessage: newMessage
} as const);
export const sendMessageAC = () => ({type: 'SEND-MESSAGE'} as const);

export type ActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof sendMessageAC>
