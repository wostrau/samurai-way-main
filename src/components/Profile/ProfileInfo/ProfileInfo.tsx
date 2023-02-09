import React from 'react';
import styles from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import userAvatar2 from '../../../assets/userAvatar2.png';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import {ProfileResponseType} from '../../../redux/profile-reducer';

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
                    src={userAvatar2}
                    alt="userAvatar"/>
                <p>{props.profile.fullName}</p>
                <p>{props.profile.userId}</p>
                <ProfileStatusWithHooks
                    status={props.status}
                    updateUserStatus={props.updateUserStatus}
                />
            </div>
        </div>
    );
};
