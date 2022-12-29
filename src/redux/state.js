export const state = {
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

export const addPost = (post) => {
    const newPost = {
        id: 3,
        message: post,
        likesCount: 0
    };
    state.profilePage.posts.unshift(newPost);
}