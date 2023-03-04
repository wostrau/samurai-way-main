import React from 'react';
import styles from './Users.module.css';
import userAvatar2 from '../../assets/userAvatar2.png';
import {NavLink} from 'react-router-dom';
import {UserStateType} from '../../redux/users-reducer';

type UserPropsType = {
    user: UserStateType
    followingInProgress: Array<number>
    unfollowUser: (id: number) => void
    followUser: (id: number) => void
}

export const User: React.FC<UserPropsType> = ({user, ...props}) => {
    return (
        <div>
            <span>
                <div className={styles.item}>
                    <NavLink to={`/profile/${user.id}`}>
                        <img
                            src={user.photos.small !== null ? user.photos.small : userAvatar2}
                            alt='usersAvatar'
                        />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button
                            disabled={props.followingInProgress.some(id => id === user.id)}
                            onClick={() => props.unfollowUser(user.id)}
                        >Unfollow</button>
                        : <button
                            disabled={props.followingInProgress.some(id => id === user.id)}
                            onClick={() => props.followUser(user.id)}
                        >Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.id}</div>
                    <div>{user.status}</div>
                </span>
            </span>
        </div>
    );
};