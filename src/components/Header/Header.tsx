import React from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {AuthPropsType} from './HeaderContainer'

export const Header: React.FC<AuthPropsType> = (props) => {
    return (
        <header className={styles.header}>
            <img src="src/components/Header/Header" alt=""/>
            <div className={styles.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} / <button onClick={props.logout}>Log OUT</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}