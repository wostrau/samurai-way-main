import React, {LegacyRef} from 'react';
import {Post} from './Post/Post';
import styles from './MyPosts.module.css';

type MyPostPropsType = {
    posts: Array<{
        id: number,
        message: string,
        likesCount: number
    }>
};

export const MyPosts = (props: MyPostPropsType) => {
    const postsElements = props.posts.map(p => {
        return (
            <Post
                key={p.id}
                message={p.message}
                likesCount={p.likesCount}
            />
        );
    });

    const newPostElement: LegacyRef<HTMLTextAreaElement> = React.createRef();
    const addPost = () => {
        let text = newPostElement.current.value;
        return text;
    };

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        ref={newPostElement}
                    ></textarea>
                </div>
                <div>
                    <button
                        onClick={addPost}
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
