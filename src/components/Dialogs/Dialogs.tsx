import React, {ChangeEvent} from 'react';
import styles from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsReducerActionsType, sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogs-reducer';

export type DialogsPageType = {
    dialogs: Array<{
        id: number,
        name: string
    }>
    messages: Array<{
        id: number,
        message: string
    }>,
    newMessageBody: string,
};
type DialogsPropsType = {
    dialogsPage: DialogsPageType,
    dispatch: (action: DialogsReducerActionsType) => void;
};

export const Dialogs = (props: DialogsPropsType) => {
    const dialogElements = props.dialogsPage.dialogs.map(dialog => {
        return (
            <DialogItem
                key={dialog.id}
                id={dialog.id}
                name={dialog.name}
            />
        );
    });
    const messagesElements = props.dialogsPage.messages.map(m => {
        return (
            <Message
                key={m.id}
                message={m.message}
            />
        );
    });

    const onSendMessageClickHandler = () => {
      props.dispatch(sendMessageAC());
    };
    const onMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewMessageBodyAC(e.currentTarget.value));
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogElements}
            </div>
            <div className={styles.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea
                            value={props.dialogsPage.newMessageBody}
                            onChange={onMessageChangeHandler}
                            name='new message area'
                            placeholder='type new message'
                            cols={30}
                            rows={5}
                        />
                    </div>
                    <div>
                        <button
                            onClick={onSendMessageClickHandler}
                        >Send message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
