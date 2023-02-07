import React from 'react';
import {Post} from './Post/Post';
import styles from './MyPosts.module.css';
import {MyPostsPropsType} from './MyPostsContainer';
import {Field, reduxForm} from 'redux-form';


export const MyPosts = (props: MyPostsPropsType) => {
    const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);
    const onAddPost = (values: any) => props.addPost(values.newPostText);

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    );
};

const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={'newPostText'}
                    component={'textarea'}
                    value={props.newPostText}
                    placeholder={'add your post here'}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

const AddNewPostFormRedux = reduxForm({form: 'addNewPostForm'})(AddNewPostForm)