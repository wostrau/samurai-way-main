import {addPostAC, deletePostAC, ProfilePageType, profileReducer} from './profile-reducer';
import {ProfileResponseType} from '../types/types'

let startState: ProfilePageType;
beforeEach(() => {
    return startState = {
        posts: [
            {id: '1', message: 'Hi, how are you?', likesCount: 5},
            {id: '2', message: 'It\'s my first post!', likesCount: 7}
        ],
        profile: {} as ProfileResponseType,
        status: ''
    };
});

it('new post should increase length of posts array', () => {
    const newPost = 'absolutely new post';
    const newState = profileReducer(startState, addPostAC(newPost));

    expect(newState.posts.length).toBe(3);
});

it('new post should be added correctly to posts array as first el', () => {
    const newPost = 'absolutely new post';
    const newState = profileReducer(startState, addPostAC(newPost));

    expect(newState.posts[0].message).toBe(newPost);
});

it('delete action should correctly decrease length of posts array', () => {
    const deleteAction = deletePostAC('1');
    const newState = profileReducer(startState, deleteAction);

    expect(newState.posts.length).toBe(1);
});

it('delete action should correctly avoid of deleting posts getting wrong id', () => {
    const deleteAction = deletePostAC('999');
    const newState = profileReducer(startState, deleteAction);

    expect(newState.posts.length).toBe(startState.posts.length);
});
