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
                    src="https://manager.almadarisp.com/user/img/user.png"
                    alt="usersAvatar"
                />
                {props.message}
                <div>#likes: {props.likesCount}</div>
            </div>
            <button>LIKE</button>
        </div>
    );
};