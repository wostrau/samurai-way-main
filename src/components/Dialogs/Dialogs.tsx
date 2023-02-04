import React, {ChangeEvent} from 'react';
import styles from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsPropsType} from './DialogsContainer';


export const Dialogs = (props: DialogsPropsType) => {
    const dialogElements = props.dialogs.map((d: any) => <DialogItem key={d.id} id={d.id} name={d.name}/>);
    const messagesElements = props.messages.map((m: any) => <Message key={m.id} message={m.message}/>);

    const onSendMessageClickHandler = () => {
      props.sendMessage();
    };
    const onMessageChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody(event.currentTarget.value);
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogElements}
            </div>
            <div className={styles.messages}>
                <div>
                    {messagesElements}
                </div>
                <div>
                    <div>
                        <textarea
                            value={props.newMessageBody}
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
