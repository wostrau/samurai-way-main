import React from 'react';
import styles from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';

type DialogsPropsType = {
    dialogs: Array<{
        id: number,
        name: string
    }>
    messages: Array<{
        id: number,
        message: string
    }>
};

export const Dialogs = (props: DialogsPropsType) => {
    const dialogElements = props.dialogs.map(dialog => {
        return (
            <DialogItem
                key={dialog.id}
                id={dialog.id}
                name={dialog.name}
            />
        );
    });
    const messagesElements = props.messages.map(m => {
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
