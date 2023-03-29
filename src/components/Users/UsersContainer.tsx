import React from 'react'
import {connect} from 'react-redux'
import {
    FilterType,
    followUserTC,
    getUsersTC,
    unfollowUserTC,
    usersAction,
    UsersPageType,
    UserStateType
} from '../../redux/users-reducer'
import {AppStateType} from '../../redux/redux-store'
import {Users} from './Users'
import {withRedirectToLogin} from '../../hoc/WithRedirectToLogin'
import {compose} from 'redux'
import {
    getCurrentPage, getFilter,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors'

type MapDispatchToPropsType = {
    setUsers: (users: Array<UserStateType>) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalUsersCount: (totalUsersCount: number) => void,
    toggleIsFetching: (isFetching: boolean) => void,
    toggleFollowingInProgress: (id: number, isFetching: boolean) => void,
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void,
    followUser: (id: number) => void,
    unfollowUser: (id: number) => void,
};

export type UsersPropsType = UsersPageType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): UsersPageType => {
    return {
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getFilter(state)
    }
};

const UsersContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {
        setUsers: usersAction.setUsers,
        setCurrentPage: usersAction.setCurrentPage,
        setTotalUsersCount: usersAction.setTotalUsersCount,
        toggleIsFetching: usersAction.toggleIsFetching,
        toggleFollowingInProgress: usersAction.toggleFollowingInProgress,
        getUsers: getUsersTC,
        followUser: followUserTC,
        unfollowUser: unfollowUserTC
    } as MapDispatchToPropsType),
    withRedirectToLogin
)(Users);

export default UsersContainer;

