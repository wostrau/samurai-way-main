import React from 'react';
import styles from './Message.module.css';

export const Message = (props: { message: string }) => {
    return <div className={styles.dialog}>{props.message}</div>
};