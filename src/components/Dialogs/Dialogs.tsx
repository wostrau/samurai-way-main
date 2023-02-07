import React from 'react';
import styles from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsPropsType} from './DialogsContainer';
import {Field, reduxForm} from 'redux-form';


export const Dialogs = (props: DialogsPropsType) => {
    const dialogElements = props.dialogs.map((d: any) => <DialogItem key={d.id} id={d.id} name={d.name}/>);
    const messagesElements = props.messages.map((m: any) => <Message key={m.id} message={m.message}/>);

    const addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody)
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
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    );
};

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={'newMessageBody'}
                    component={'textarea'}
                    placeholder="type new message"
                    cols={30}
                    rows={5}
                />
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    );
};

const AddMessageFormRedux = reduxForm({form: 'AddMessageForm'})(AddMessageForm);