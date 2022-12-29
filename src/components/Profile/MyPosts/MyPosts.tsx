import React, {useState} from 'react';
import {Post} from './Post/Post';
import styles from './MyPosts.module.css';

type MyPostPropsType = {
    posts: Array<{
        id: number,
        message: string,
        likesCount: number
    }>
    addPost: (post: string) => void;
};

export const MyPosts = (props: MyPostPropsType) => {
    const [post, setPost] = useState<string>('');
    const postsElements = props.posts.map(p => {
        return (
            <Post
                key={p.id}
                message={p.message}
                likesCount={p.likesCount}
            />
        );
    });
    const onClickHandler = () => {
        props.addPost(post);
        setPost('');
    };

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        value={post}
                        onChange={(e) => setPost(e.currentTarget.value)}
                    ></textarea>
                </div>
                <div>
                    <button
                        onClick={onClickHandler}
                    >Add post
                    </button>
                </div>
            </div>
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    );
};
