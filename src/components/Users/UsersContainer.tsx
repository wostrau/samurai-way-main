import React from 'react';
import {connect} from 'react-redux';
import {
    followUserAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowUserAC,
    UsersPageType,
    UsersReducerActionsType,
    UserType
} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {Users} from './Users';

type MapDispatchToPropsType = {
    setUsers: (users: Array<UserType>) => void,
    followUser: (id: string) => void,
    unfollowUser: (id: string) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalUsersCount: (totalUsersCount: number) => void,
};

export type UsersPropsType = UsersPageType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): UsersPageType => {
    return {
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<UsersReducerActionsType>): MapDispatchToPropsType => {
    return {
        setUsers: (users: Array<UserType>) => dispatch(setUsersAC(users)),
        followUser: (id: string) => dispatch(followUserAC(id)),
        unfollowUser: (id: string) => dispatch(unfollowUserAC(id)),
        setCurrentPage: (currentPage: number) => dispatch(setCurrentPageAC(currentPage)),
        setTotalUsersCount: (totalUsersCount: number) => dispatch(setTotalUsersCountAC(totalUsersCount)),
    }
};

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);