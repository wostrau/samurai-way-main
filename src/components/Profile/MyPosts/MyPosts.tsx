import React from 'react';
import {Post} from './Post/Post';
import styles from './MyPosts.module.css';
import {MyPostsPropsType} from './MyPostsContainer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLength30, minLength2, requiredField} from '../../../utilities/validators';
import {Textarea} from '../../common/FormControls/FormControls';

type FormDataType = { newPostText: string };

const AddNewPostForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={'newPostText'}
                    component={Textarea}
                    placeholder={'add your post here'}
                    validate={[requiredField, maxLength30, minLength2]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

const AddNewPostFormRedux = reduxForm<FormDataType>({form: 'addNewPostForm'})(AddNewPostForm);

export const MyPosts = React.memo((props: MyPostsPropsType) => {
    const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);
    const onAddPost = (values: FormDataType) => props.addPost(values.newPostText);

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    );
});