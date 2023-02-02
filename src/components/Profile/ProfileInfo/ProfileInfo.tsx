import React from 'react';
import styles from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';

export const ProfileInfo = (props: any) => {
    if (!props.profile) return <Preloader/>;
    return (
        <div>
            <div>
                <img
                    src="https://media.istockphoto.com/id/1153191469/photo/cityscape-of-ortygia-the-historical-center-of-syracuse-sicily-italy.jpg?s=612x612&w=0&k=20&c=wJGOH1egi1M4c3FAthyjV927AGPcBKcD-uACgFCIISw="
                    alt=""
                />
            </div>
            <div className={styles.descriptionBlock}>
                <img src={props.profile.photos.small} alt='userAvatar'/>
            </div>
        </div>
    );
};
