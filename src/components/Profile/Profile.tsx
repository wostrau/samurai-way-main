import React from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';

export type PostDataPropsType = {
    profilePage: {
        posts: Array<{
            id: number,
            message: string,
            likesCount: number
        }>
    }
};

export const Profile = (props: PostDataPropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}/>
        </div>
    );
};