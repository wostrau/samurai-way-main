import React from 'react';
import {Post} from './Post/Post';
import styles from './MyPosts.module.css';

export const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div className={styles.posts}>
            <Post message='Hi, how are you?'/>
            <Post message='Its my first post!'/>
            </div>
        </div>
    );
};
