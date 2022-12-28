import React from 'react';
import {Post} from './Post/Post';
import styles from './MyPosts.module.css';
import {PostDataPropsType} from '../Profile';

export const MyPosts = (props: PostDataPropsType) => {
    const postsElements = props.posts.map(p => {
        return (
            <Post
                key={p.id}
                message={p.message}
                likesCount={p.likesCount}
            />
        );
    });

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    );
};
