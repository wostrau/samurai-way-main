import React from 'react';
import axios from 'axios';
import {UsersPropsType} from './UsersContainer';
import styles from './Users.module.css';
import {avatarURL} from '../../redux/users-reducer';

export class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items)
                this.props.setTotalUsersCount(res.data.totalCount)
            });
    }

    currentPageChange(pageNumber: number) {
        this.props.setCurrentPage(pageNumber);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items)
            });
    }

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) pages.push(i);

        return (
            <div>
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
                                    <img
                                        src={u.photos.small ? u.photos.small : avatarURL}
                                        alt="usersAvatar"
                                    />
                                </div>
                                <div>
                                    {
                                        u.followed
                                            ? <button onClick={() => this.props.unfollowUser(u.id)}>Unfollow</button>
                                            : <button onClick={() => this.props.followUser(u.id)}>Follow</button>
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
        );
    };
}