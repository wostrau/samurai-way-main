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
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                <DialogItem
                    id={1}
                    name={'DIMYCH'}
                />
                <DialogItem
                    id={2}
                    name={'ANDREW'}
                />
            </div>
            <div className={styles.messages}>
                <Message message={'Hi, how are you?'}/>
                <Message message={'I\'m fine, thanks'}/>
                <Message message={'What are your plans?'}/>
                <Message message={'What are your plans?'}/>
                <Message message={'Go for a walk this evening'}/>
            </div>
        </div>
    );
};
