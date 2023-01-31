import React from 'react';
import {connect} from 'react-redux';
import {Users} from './Users';
import {
    followUserAC,
    setUsersAC,
    unfollowUserAC,
    UsersPageType,
    UsersReducerActionsType,
    UsersType
} from '../../redux/users-reducer';


const mapStateToProps = (state: { usersPage: UsersPageType }) => {
    return {
        usersPage: state.usersPage,
    }
};
const mapDispatchToProps = (dispatch: (action: UsersReducerActionsType) => void) => {
    return {
        setUsers: (users: UsersType) => dispatch(setUsersAC(users)),
        followUser: (id: string) => dispatch(followUserAC(id)),
        unfollowUser: (id: string) => dispatch(unfollowUserAC(id)),
    }
};

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
