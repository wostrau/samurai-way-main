import React from 'react';
import styles from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {AuthPropsType} from './HeaderContainer';

export const Header = (props: AuthPropsType) => {
    return (
        <header className={styles.header}>
            <img src="src/components/Header/Header" alt=""/>
            <div className={styles.loginBlock}>
                {props.isAuth
                ? props.login
                : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
};