import React from 'react';
import {addPostAC, ProfilePageType, ProfileReducerActionsType} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';
import {Dispatch} from 'redux';

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
};

export type MyPostsPropsType = ProfilePageType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): ProfilePageType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        status: state.profilePage.status
    };
};
const mapDispatchToProps = (dispatch: Dispatch<ProfileReducerActionsType>): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        }
    };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);