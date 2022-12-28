import React from 'react';
import {Post} from './Post/Post';
import styles from './MyPosts.module.css';

export const MyPosts = () => {
    const postData = [
        {id: 1, message: 'Hi, how are you?', likesCount: 5},
        {id: 2, message: 'It\'s my first post!', likesCount: 7}
    ]
    const postsElements = postData.map(p=>{
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
