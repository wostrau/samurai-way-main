import React from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ActionsType} from '../../redux/state';

export type PostDataPropsType = {
    profilePage: {
        posts: Array<{
            id: number,
            message: string,
            likesCount: number
        }>,
        newPostText: string
    },
    dispatch: (action: ActionsType) => void;
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