import React from 'react';
import {ProfileStateType, ProfileReducerActionsType, profileAction} from '../../../redux/profile-reducer'
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';
import {Dispatch} from 'redux';

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
};

export type MyPostsPropsType = ProfileStateType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): ProfileStateType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        status: state.profilePage.status
    };
};
const mapDispatchToProps = (dispatch: Dispatch<ProfileReducerActionsType>): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(profileAction.addPost(newPostText))
        }
    };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);