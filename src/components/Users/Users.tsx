import React from 'react';
import {avatarURL} from '../../redux/users-reducer';
import styles from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import axios from 'axios';


export const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        axios
            .get('https://social-network.samuraijs.com/api/1.0/users')
            .then(res => props.setUsers(res.data.items));
    }

    const createdUsers = props.users.map(u => {
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
                                ? <button onClick={() => props.unfollowUser(u.id)}>Unfollow</button>
                                : <button onClick={() => props.followUser(u.id)}>Follow</button>
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
    });
    return (
        <div>
            {createdUsers}
        </div>
    );
};