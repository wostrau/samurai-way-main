import React from 'react';
import styles from './Post.module.css';

export const Post = (props: {message: string}) => {
    return (
        <div className={styles.posts}>
            <div
                className={styles.item}
            >
                <img
                    src="https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg"
                    alt="avatar image"
                />
                {props.message}
            </div>
            <button>LIKE</button>
            <button>disLIKE</button>
        </div>
    );
};