import React from 'react';
import {UsersPropsType} from './UsersContainer';
import styles from './Users.module.css';
import userAvatar2 from '../../assets/userAvatar2.png';
import {Preloader} from '../common/Preloader/Preloader';
import {NavLink} from 'react-router-dom';

export class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    };

    currentPageChange(pageNumber: number) {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);
    };

    followUser(id: string) {
        this.props.followUser(id);
    };

    unfollowUser(id: string) {
        this.props.unfollowUser(id);
    };

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
                                            src={u.photos.small ? u.photos.small : userAvatar2}
                                            alt="usersAvatar"
                                        />
                                    </NavLink>
                                </div>
                                <div>
                                    {
                                        u.followed
                                            ? <button
                                                disabled={this.props.followingInProgress.some(id => id === u.id)}
                                                onClick={()=>this.unfollowUser(u.id)}
                                            >Unfollow</button>
                                            : <button
                                                disabled={this.props.followingInProgress.some(id => id === u.id)}
                                                onClick={()=>this.followUser(u.id)}
                                            >Follow</button>
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