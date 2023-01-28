import React, {ChangeEvent} from 'react';
import {Post} from './Post/Post';
import styles from './MyPosts.module.css';

type MyPostPropsType = {
    posts: Array<{
        id: number,
        message: string,
        likesCount: number
    }>,
    newPostText: string,
    addPost: () => void,
    updateNewPostText: (newText: string) => void,
};

export const MyPosts = (props: MyPostPropsType) => {
    const addPostHandler = () => {
        props.addPost();
    };
    const onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value);
    };

    const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        value={props.newPostText}
                        onChange={onPostChangeHandler}
                        placeholder={'add your post here'}
                    />
                </div>
                <div>
                    <button
                        onClick={addPostHandler}
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
