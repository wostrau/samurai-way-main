import React from 'react'
import {Contact} from './Contact'
import {ProfileResponseType} from '../../../api/profile-api'
import {ContactsType} from '../../../types/types'

type ProfileDataPropsType = {
    profile: ProfileResponseType
    isOwner: boolean
    activateEditMode: () => void
}

export const ProfileData = (props: ProfileDataPropsType) => {
    const {isOwner, profile, activateEditMode} = props
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
            {profile.contacts && Object.keys(profile.contacts).map((key) => {
                return <Contact
                    key={key}
                    contactTitle={key as keyof ContactsType}
                    contactValue={profile.contacts[key as keyof ContactsType]}
                />
            })}
        </div>
    )
}