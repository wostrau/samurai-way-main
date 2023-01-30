import React from 'react';
import {addPostAC, updateNewPostTextAC, ProfilePageType, ProfileReducerActionsType} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';


const mapStateToProps = (state: { profilePage: ProfilePageType }) => {
    return {
        profilePage: state.profilePage
    };
};
const mapDispatchToProps = (dispatch: (action: ProfileReducerActionsType) => void) => {
    return {
        addPost: ()=>{dispatch(addPostAC())},
        updateNewPostText: (text: string)=>{dispatch(updateNewPostTextAC(text))},
    };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);