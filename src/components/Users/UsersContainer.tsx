import React from 'react';
import {connect} from 'react-redux';
import {
    followUserTC,
    getUsersTC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleFollowingInProgressAC,
    toggleIsFetchingAC,
    unfollowUserTC,
    UsersPageType,
    UserType
} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Users} from './Users';
import {withRedirectToLogin} from '../../hoc/WithRedirectToLogin';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors';

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
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

const UsersContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPageAC,
        setTotalUsersCount: setTotalUsersCountAC,
        toggleIsFetching: toggleIsFetchingAC,
        toggleFollowingInProgress: toggleFollowingInProgressAC,
        getUsers: getUsersTC,
        followUser: followUserTC,
        unfollowUser: unfollowUserTC
    } as MapDispatchToPropsType),
    withRedirectToLogin
)(Users);

export default UsersContainer;

