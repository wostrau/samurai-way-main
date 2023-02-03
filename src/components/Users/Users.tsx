import React from 'react';
import axios from 'axios';
import {UsersPropsType} from './UsersContainer';
import styles from './Users.module.css';
import {avatarURL} from '../../redux/users-reducer';
import {Preloader} from '../common/Preloader/Preloader';
import {NavLink} from 'react-router-dom';
import {usersAPI} from '../../api/api';

export class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });
    }

    currentPageChange(pageNumber: number) {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items)
        });
    }

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) pages.push(i);

        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <div>
                        {pages.map((p, index) => <span
                            key={index}
                            className={this.props.currentPage === p ? styles.selected : ''}
                            onClick={() => {
                                this.currentPageChange(p)
                            }}
                        >{p}</span>)}
                        {this.props.users.map(u => {
                            return (
                                <div key={u.id}>
                            <span>
                                <div className={styles.item}>
                                    <NavLink to={`/profile/${u.id}`}>
                                        <img
                                            src={u.photos.small ? u.photos.small : avatarURL}
                                            alt="usersAvatar"
                                        />
                                    </NavLink>
                                </div>
                                <div>
                                    {
                                        u.followed
                                            ? <button
                                                disabled={this.props.followingInProgress.some(id => id === u.id)}
                                                onClick={() => {
                                                this.props.toggleFollowingInProgress(u.id, true);
                                                axios
                                                    .delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                                        withCredentials: true,
                                                        headers: {'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'}
                                                    })
                                                    .then(res => {
                                                        if (res.data.resultCode === 0) this.props.unfollowUser(u.id);
                                                        this.props.toggleFollowingInProgress(u.id, false);
                                                    });
                                            }}>Unfollow</button>
                                            : <button
                                                disabled={this.props.followingInProgress.some(id => id === u.id)}
                                                onClick={() => {
                                                this.props.toggleFollowingInProgress(u.id, true);
                                                axios
                                                    .post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, null, {
                                                        withCredentials: true,
                                                        headers: {'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'}
                                                    })
                                                    .then(res => {
                                                        if (res.data.resultCode === 0) this.props.followUser(u.id);
                                                        this.props.toggleFollowingInProgress(u.id, false);
                                                    });
                                            }}>Follow</button>
                                    }
                                        </div>
                                        </span>
                                    <span>
                                        <span>
                                        <div>{u.name}</div>
                                        <div>{u.id}</div>
                                        <div>{u.status}</div>
                                        </span>
                                        </span>
                                </div>
                            );
                        })}
                    </div>
                }
            </>
        );
    };
}