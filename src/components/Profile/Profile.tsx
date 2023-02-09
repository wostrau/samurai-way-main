import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfileResponseType} from '../../redux/profile-reducer';

type ProfilePropsType = {
    status: string
    profile: ProfileResponseType,
    updateUserStatus: (status: string) => void,
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo
                status={props.status}
                profile={props.profile}
                updateUserStatus={props.updateUserStatus}
            />
            <MyPostsContainer/>
        </div>
    );
};