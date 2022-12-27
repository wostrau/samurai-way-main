import React from 'react';
import styles from './Dialogs.module.css';

export const Dialogs = () => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                <div className={`${styles.dialog} ${styles.active}`}>DIMYCH</div>
                <div className={styles.dialog}>ANDREW</div>
                <div className={styles.dialog}>ANTONI</div>
                <div className={styles.dialog}>CAPONE</div>
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
