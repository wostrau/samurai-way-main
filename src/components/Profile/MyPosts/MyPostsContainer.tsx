import React from 'react';
import {addPostAC, updateNewPostTextAC} from '../../../redux/profile-reducer';
import {StoreContext} from '../../../redux/storeContext';
import {MyPosts} from './MyPosts';


/*type MyPostPropsType = {
    posts: Array<{
        id: string,
        message: string,
        likesCount: number
    }>,
    newPostText: string,
    dispatch: (action: ProfileReducerActionsType) => void;
};*/

export const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store)=>{
                const addPost = () => store.dispatch(addPostAC());
                const updateNewPostText = (text: string) => store.dispatch(updateNewPostTextAC(text));

                return (
                    <MyPosts
                        posts={store.getState().profilePage.posts}
                        newPostText={store.getState().profilePage.newPostText}
                        addPost={addPost}
                        updateNewPostText={updateNewPostText}
                    />
                );
            }}
        </StoreContext.Consumer>
    );
};
