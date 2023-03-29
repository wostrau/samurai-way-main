import React from 'react'
import styles from './Users.module.css'
import userAvatar2 from '../../assets/userAvatar2.png'
import {NavLink} from 'react-router-dom'
import {followUserTC, unfollowUserTC, UserStateType} from '../../redux/users-reducer'
import {useDispatch} from 'react-redux'

type UserPropsType = {
    user: UserStateType
    followingInProgress: number[]
}

export const User: React.FC<UserPropsType> = ({user, followingInProgress}) => {
    const dispatch = useDispatch()

    return (
        <div>
            <span>
                <div className={styles.item}>
                    <NavLink to={`/profile/${user.id}`}>
                        <img
                            src={user.photos.small !== null ? user.photos.small : userAvatar2}
                            alt="usersAvatar"
                        />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => dispatch(unfollowUserTC(user.id))}
                        >Unfollow</button>
                        : <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => dispatch(followUserTC(user.id))}
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
    )
}