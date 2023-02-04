import React from 'react';
import {connect} from 'react-redux';
import {
    followUserTC,
    getUsersTC,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFollowingInProgress,
    toggleIsFetching,
    unfollowUserTC,
    UsersPageType,
    UserType
} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Users} from './Users';
import {LoginRedirect} from '../../hoc/LoginRedirect';

type MapDispatchToPropsType = {
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalUsersCount: (totalUsersCount: number) => void,
    toggleIsFetching: (isFetching: boolean) => void,
    toggleFollowingInProgress: (id: string, isFetching: boolean) => void,
    getUsers: (currentPage: number, pageSize: number) => void,
    followUser: (id: string) => void,
    unfollowUser: (id: string) => void,
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

const withRedirect = LoginRedirect(Users)
export const UsersContainer = connect(mapStateToProps, {
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingInProgress,
    getUsers: getUsersTC,
    followUser: followUserTC,
    unfollowUser: unfollowUserTC
} as MapDispatchToPropsType)(withRedirect);

