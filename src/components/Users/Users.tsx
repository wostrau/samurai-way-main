import React from 'react';
import {avatarURL} from '../../redux/users-reducer';
import styles from './Users.module.css';
import {UsersPropsType} from './UsersContainer';


export const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: '1',
                avatar: avatarURL,
                fullName: 'Ales Astrautsou',
                status: 'Need more effort and concentration!',
                location: {country: 'Belarus', city: 'Minsk'},
                isFollowed: true
            },
            {
                id: '2',
                avatar: avatarURL,
                fullName: 'Aliaksei Vayukou',
                status: 'Need to make right choice',
                location: {country: 'Belarus', city: 'Mahilou'},
                isFollowed: false
            },
        ]);
    }

    const createdUsers = props.users.map(u => {
        return (
            <div key={u.id}>
                <span>
                    <div className={styles.item}>
                        <img
                            src={u.avatar}
                            alt="usersAvatar"
                        />
                    </div>
                    <div>
                        {
                            u.isFollowed
                                ? <button onClick={() => props.unfollowUser(u.id)}>Unfollow</button>
                                : <button onClick={() => props.followUser(u.id)}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
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