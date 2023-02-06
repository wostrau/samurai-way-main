import React from 'react';
import styles from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileStatus} from './ProfileStatus';
import {ProfileResponseType} from '../ProfileContainer';
import userAvatar2 from '../../../assets/userAvatar2.png';

type ProfileInfoPropsType = {
    status: string
    profile: ProfileResponseType,
    updateUserStatus: (status: string) => void,
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {

    if (!props.profile) {
        return <Preloader/>;
    }

    return (
        <div>
            <div className={styles.descriptionBlock}>
                <img
                    style={{height: '200px'}}
                    src={props.profile.photos.large || userAvatar2}
                    alt="userAvatar"/>
                <p>{props.profile.fullName}</p>
                <p>{props.profile.userId}</p>
                <ProfileStatus
                    status={props.status}
                    updateUserStatus={props.updateUserStatus}
                />
            </div>
        </div>
    );
};
