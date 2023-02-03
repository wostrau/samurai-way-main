import React from 'react';
import {connect} from 'react-redux';
import {
    followUser,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingInProgress,
    toggleIsFetching,
    unfollowUser,
    UsersPageType,
    UserType
} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Users} from './Users';

type MapDispatchToPropsType = {
    setUsers: (users: Array<UserType>) => void,
    followUser: (id: string) => void,
    unfollowUser: (id: string) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalUsersCount: (totalUsersCount: number) => void,
    toggleIsFetching: (isFetching: boolean) => void,
    toggleFollowingInProgress: (id: string, isFetching: boolean) => void,
};

export type UsersPropsType = UsersPageType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): UsersPageType => {
    return {
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
};

export const UsersContainer = connect(mapStateToProps, {
    setUsers,
    followUser,
    unfollowUser,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingInProgress
} as MapDispatchToPropsType)(Users);

