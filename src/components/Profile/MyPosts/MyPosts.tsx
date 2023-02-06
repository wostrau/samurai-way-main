import React, {ChangeEvent} from 'react';
import {Post} from './Post/Post';
import styles from './MyPosts.module.css';
import {MyPostsPropsType} from './MyPostsContainer';
import {Preloader} from '../../common/Preloader/Preloader';


export const MyPosts = (props: MyPostsPropsType) => {

    const addPostHandler = () => {
        props.addPost();
    };
    const onPostChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(event.currentTarget.value);
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
