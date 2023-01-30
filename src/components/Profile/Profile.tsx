import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ProfileReducerActionsType} from '../../redux/profile-reducer';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

export type ProfilePageType = {
    posts: Array<{
        id: string,
        message: string,
        likesCount: number
    }>,
    newPostText: string
};
export type PostDataPropsType = {
    profilePage: ProfilePageType,
    dispatch: (action: ProfileReducerActionsType) => void;
};

export const Profile = (props: PostDataPropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
                posts={props.profilePage.posts}
                newPostText={props.profilePage.newPostText}
                dispatch={props.dispatch}
            />
        </div>
    );
};