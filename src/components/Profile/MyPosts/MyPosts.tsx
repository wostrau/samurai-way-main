import React from 'react'
import {Post} from './Post/Post'
import styles from './MyPosts.module.css'
import AddNewPostForm, {FormDataType} from './AddPostForm/AddNewPostForm'
import {ProfileStateType} from '../../../redux/profile-reducer'
import {MapDispatchToPropsType} from './MyPostsContainer';


type MyPostsPropsType = ProfileStateType & MapDispatchToPropsType;

export const MyPosts = React.memo((props: MyPostsPropsType) => {
    const postsElements = [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)
    const onAddPost = (values: FormDataType) => props.addPost(values.newPostText)

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={onAddPost}/>
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    )
})