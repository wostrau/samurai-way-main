import React from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ProfileReducerActionsType} from '../../redux/profile-reducer';

export type ProfilePageType = {
    posts: Array<{
        id: number,
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
            <MyPosts
                posts={props.profilePage.posts}
                newPostText={props.profilePage.newPostText}
                dispatch={props.dispatch}
            />
        </div>
    );
};