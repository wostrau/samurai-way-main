import React from 'react';
import {addPostAC, ProfileReducerActionsType, updateNewPostTextAC} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';

type MyPostPropsType = {
    posts: Array<{
        id: string,
        message: string,
        likesCount: number
    }>,
    newPostText: string,
    dispatch: (action: ProfileReducerActionsType) => void;
};

export const MyPostsContainer = (props: MyPostPropsType) => {
    const addPost = () => props.dispatch(addPostAC());
    const updateNewPostText = (text: string) => props.dispatch(updateNewPostTextAC(text));

    return <MyPosts
        posts={props.posts}
        newPostText={props.newPostText}
        addPost={addPost}
        updateNewPostText={updateNewPostText}
    />;
};
