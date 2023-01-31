import React from 'react';
import {connect} from 'react-redux';
import {Users} from './Users';
import {
    followUserAC,
    setUsersAC,
    unfollowUserAC,
    UsersPageType,
    UsersReducerActionsType,
    UserType
} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';

type MapDispatchToPropsType = {
    setUsers: (users: Array<UserType>) => void,
    followUser: (id: string) => void,
    unfollowUser: (id: string) => void,
};

export type UsersPropsType = UsersPageType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): UsersPageType => {
    return {
        users: state.usersPage.users,
    }
};
const mapDispatchToProps = (dispatch: Dispatch<UsersReducerActionsType>): MapDispatchToPropsType => {
    return {
        setUsers: (users: Array<UserType>) => dispatch(setUsersAC(users)),
        followUser: (id: string) => dispatch(followUserAC(id)),
        unfollowUser: (id: string) => dispatch(unfollowUserAC(id)),
    }
};

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
