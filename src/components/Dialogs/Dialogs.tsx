import React from 'react';
import styles from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';

export const Dialogs = () => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                <div className={`${styles.dialog} ${styles.active}`}>
                    <NavLink to="/dialogs/1">
                        DIMYCH
                    </NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to="/dialogs/1">
                        ANDREW
                    </NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to="/dialogs/1">
                        ANTONI
                    </NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to="/dialogs/1">
                        CAPONE
                    </NavLink>
                </div>
            </div>
            <div className={styles.messages}>
                <div className={styles.dialog}>Hi, how are you?</div>
                <div className={styles.dialog}>I'm fine, thanks</div>
                <div className={styles.dialog}>What are your plans?</div>
                <div className={styles.dialog}>Go for a walk this evening</div>
            </div>
        </div>
    );
};
