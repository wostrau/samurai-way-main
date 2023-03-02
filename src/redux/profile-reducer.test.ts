import {profileAction, profileReducer, ProfileStateType} from './profile-reducer'
import {ProfileResponseType} from '../api/profile-api'

let startState: ProfileStateType;
beforeEach(() => {
    return startState = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 5},
            {id: 2, message: 'It\'s my first post!', likesCount: 7}
        ],
        profile: {} as ProfileResponseType,
        status: ''
    };
});

it('new post should increase length of posts array', () => {
    const newPost = 'absolutely new post';
    const newState = profileReducer(startState, profileAction.addPost(newPost));

    expect(newState.posts.length).toBe(3);
});

it('new post should be added correctly to posts array as first el', () => {
    const newPost = 'absolutely new post';
    const newState = profileReducer(startState, profileAction.addPost(newPost));

    expect(newState.posts[0].message).toBe(newPost);
});

it('delete action should correctly decrease length of posts array', () => {
    const newState = profileReducer(startState, profileAction.deletePost(1));

    expect(newState.posts.length).toBe(1);
});

it('delete action should correctly avoid of deleting posts getting wrong id', () => {
    const newState = profileReducer(startState, profileAction.deletePost(999));

    expect(newState.posts.length).toBe(startState.posts.length);
});
