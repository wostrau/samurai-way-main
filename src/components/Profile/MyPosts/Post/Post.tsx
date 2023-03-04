import React from 'react'
import styles from './Post.module.css'
import userAvatar2 from '../../../../assets/userAvatar2.png'

type PostPropsType = {
    message: string
    likesCount: number
}

export const Post: React.FC<PostPropsType> = (props) => {
    return (
        <div className={styles.posts}>
            <div
                className={styles.item}
            >
                <img
                    src={userAvatar2}
                    alt="usersAvatar"
                />
                {props.message}
                <div>#likes: {props.likesCount}</div>
            </div>
            <button>LIKE</button>
        </div>
    )
}