import React from 'react';
import classes from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';

export const Profile = () => {
    return (
        <div className={classes.profile}>
            <img
                src="https://media.istockphoto.com/id/1153191469/photo/cityscape-of-ortygia-the-historical-center-of-syracuse-sicily-italy.jpg?s=612x612&w=0&k=20&c=wJGOH1egi1M4c3FAthyjV927AGPcBKcD-uACgFCIISw="
                alt=""/>

            <div>ava + description</div>
            <MyPosts/>
        </div>
    );
};