import React from 'react';
import {ProfileResponseType} from '../../../api/profile-api'

export type ProfileContacts = keyof ProfileResponseType['contacts'];

export const Contact: React.FC<{ contactTitle: ProfileContacts, contactValue: string }> = ({ contactTitle, contactValue }) => {
    return (
        <div style={{paddingLeft: '10px'}}>
            <b>{contactTitle}: </b>{contactValue}
        </div>
    );
};
