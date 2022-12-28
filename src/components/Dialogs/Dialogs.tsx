import React from 'react';
import styles from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemPropsType = {
    id: number
    name: string
}

export const DialogItem = (props: DialogItemPropsType) => {
    return (
        <div className={`${styles.dialog} ${styles.active}`}>
            <NavLink to={`/dialogs/${props.id}`}>
                {props.name}
            </NavLink>
        </div>
    )
};

export const Message = (props: { message: string }) => {
    return <div className={styles.dialog}>{props.message}</div>
};

export const Dialogs = () => {
    const dialogsData = [
        {id: 1, name: 'DIMYCH'},
        {id: 2, name: 'ANDREW'}
    ];
    const dialogElements = dialogsData.map(dialog => {
        return (
            <DialogItem
                id={dialog.id}
                name={dialog.name}
            />
        );
    });
    const messagesData = [
        {id: 1, message: 'Hi, how are you?'},
        {id: 2, message: 'I\'m fine, thanks'},
        {id: 3, message: 'What are your plans?'},
        {id: 4, message: 'Go for a walk this evening'}
    ];
    const messagesElements = messagesData.map(m => {
        return (
            <Message
                key={m.id}
                message={m.message}
            />
        );
    });

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogElements}
            </div>
            <div className={styles.messages}>
                {messagesElements}
            </div>
        </div>
    );
};
