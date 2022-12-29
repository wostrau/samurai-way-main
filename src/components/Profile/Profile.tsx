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
    addPost: (post: string) => void
};

export const Profile = (props: PostDataPropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.profilePage.posts}
                addPost={props.addPost}
            />
        </div>
    );
};