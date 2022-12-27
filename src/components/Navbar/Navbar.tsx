import React from 'react';
import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={`${styles.item} ${styles.active}`}>
                <NavLink
                    activeClassName={styles.activeLink}
                    to="/profile"
                >profile</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink
                    activeClassName={styles.activeLink}
                    to="/dialogs"
                >messages</NavLink>
            </div>
        </nav>
    );
};