import React from 'react';
import styles from './Post.module.css';

type PostPropsType = {
    message: string
    likesCount: number
}

export const Post = (props: PostPropsType) => {
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
                <div>#likes: {props.likesCount}</div>
            </div>
            <button>LIKE</button>
        </div>
    );
};