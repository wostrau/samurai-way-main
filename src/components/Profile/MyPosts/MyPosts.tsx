import React, {ChangeEvent} from 'react';
import {Post} from './Post/Post';
import styles from './MyPosts.module.css';
import {ProfilePageType} from '../../../redux/profile-reducer';

type MyPostPropsType = {
    profilePage: ProfilePageType
    addPost: () => void;
    updateNewPostText: (text: string) => void;
};

export const MyPosts = (props: MyPostPropsType) => {
    const addPostHandler = () => {
        props.addPost();
    };
    const onPostChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(event.currentTarget.value);
    };

    const postsElements = props.profilePage.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        value={props.profilePage.newPostText}
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
