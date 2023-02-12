import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import userAvatar2 from '../../../assets/userAvatar2.png';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import {ProfileResponseType} from '../../../redux/profile-reducer';
import {ProfileData} from './ProfileData';
import {ProfileDataForm} from './ProfileDataForm';


type ProfileInfoPropsType = {
    isOwner: boolean
    status: string
    profile: ProfileResponseType
    updateUserStatus: (status: string) => void
    savePhoto: (photo: File) => void
}

export const ProfileInfo = ({isOwner, status, profile, updateUserStatus, savePhoto}: ProfileInfoPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    if (!profile) return <Preloader/>;

    const onProfilePhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            if (e.currentTarget.files.length) savePhoto(e.currentTarget.files[0]);
        }
    };

    return (
        <div>
            <div className={styles.descriptionBlock}>
                <img
                    className={styles.mainPhoto}
                    style={{height: '200px'}}
                    src={profile && profile.photos && profile.photos.large ? profile.photos.large : userAvatar2}
                    alt="userAvatar"/>
                {isOwner && <input type={'file'} onChange={onProfilePhotoSelect}/>}
                {editMode
                    ? <ProfileDataForm profile={profile}/>
                    : <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        activateEditMode={() => setEditMode(true)}
                    />}
                <ProfileStatusWithHooks
                    status={status}
                    updateUserStatus={updateUserStatus}
                />
            </div>
        </div>
    );
};


