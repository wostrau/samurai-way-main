import React from 'react';
import {
    addPostAC,
    ProfilePageType,
    ProfileReducerActionsType,
    updateNewPostTextAC
} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';
import {Dispatch} from 'redux';

type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
};

export type MyPostsPropsType = ProfilePageType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): ProfilePageType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        status: state.profilePage.status
    };
};
const mapDispatchToProps = (dispatch: Dispatch<ProfileReducerActionsType>): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        updateNewPostText: (text: string) => {
            dispatch(updateNewPostTextAC(text))
        },
    };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);