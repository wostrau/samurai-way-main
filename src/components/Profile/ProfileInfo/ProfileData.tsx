import React from 'react';
import {Contact, ProfileContacts} from './Contact';
import {ProfileResponseType} from '../../../types/types'

type ProfileDataPropsType = {
    profile: ProfileResponseType
    isOwner: boolean
    activateEditMode: () => void
}

export const ProfileData = (props: ProfileDataPropsType) => {
    const {isOwner, profile, activateEditMode} = props;
    return (
        <div>
            {isOwner && <div>
                <button onClick={activateEditMode}>edit profile</button>
            </div>}
            <div><b>fullName: </b>{profile.fullName}</div>
            <div><b>ID: </b>{profile.userId}</div>
            <div><b>About me: </b>{profile.aboutMe}</div>
            <div><b>Open to work: </b>{profile.lookingForAJob ? 'yes' : 'not at the moment'}</div>
            {profile.lookingForAJob && <div><b>profSkills: </b>{profile.lookingForAJobDescription}</div>}
            {profile.contacts && Object.entries(profile.contacts).map(([key, value]) => {
                return <Contact key={key} contactTitle={key as ProfileContacts} contactValue={value}/>;
                })
            }
        </div>
    );
};