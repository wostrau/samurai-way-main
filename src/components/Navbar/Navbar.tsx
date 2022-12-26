import React from 'react';
import classes from './Navbar.module.css';

export const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div className={`${classes.item} ${classes.active}`}>
                <a>profile</a>
            </div>
            <div className={classes.item}>
                <a>messages</a>
            </div>
        </nav>
    );
};