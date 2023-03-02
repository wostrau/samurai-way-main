import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import userAvatar2 from '../../../assets/userAvatar2.png';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import {ProfileData} from './ProfileData';
import ProfileDataReduxForm, {ProfileDataFormType} from './ProfileDataForm';
import {ProfileResponseType} from '../../../api/profile-api'


type ProfileInfoPropsType = {
    isOwner: boolean
    status: string
    profile: ProfileResponseType
    updateUserStatus: (status: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfileResponseType) => Promise<void>
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    const {isOwner, status, profile, updateUserStatus, savePhoto, saveProfile} = props;
    const [editMode, setEditMode] = useState<boolean>(false);

    if (!profile) return <Preloader/>;

    const onProfilePhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            if (e.currentTarget.files.length) savePhoto(e.currentTarget.files[0]);
        }
    };

    const onSubmit = (formData: ProfileDataFormType) => {
        const updatedProfile = {...profile, ...formData};
        saveProfile(updatedProfile).then(() => {
            setEditMode(false);
        });
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
                    ? <ProfileDataReduxForm
                        initialValues={profile}
                        onSubmit={onSubmit}
                        contacts={profile.contacts}
                    />
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


