import React from 'react';
import {avatarURL} from '../../redux/users-reducer';
import styles from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import axios from 'axios';


export class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios
            .get('https://social-network.samuraijs.com/api/1.0/users')
            .then(res => this.props.setUsers(res.data.items));
    }

    render() {
        return (
            <div>
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
                                    <div>{u.status}</div>
                                </span>
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }
}