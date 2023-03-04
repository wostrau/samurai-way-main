import React from 'react'
import styles from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem'
import {Message} from './Message/Message'
import {MapDispatchToPropsType} from './DialogsContainer'
import {DialogsStateType} from '../../redux/dialogs-reducer'
import {AddMessageFormRedux, AddMessageFormValueType} from './AddMessageForm/AddMessageForm'


type DialogsPropsType = DialogsStateType & MapDispatchToPropsType

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const dialogElements = props.dialogs.map((d: any) => <DialogItem key={d.id} id={d.id} name={d.name}/>)
    const messagesElements = props.messages.map((m: any) => <Message key={m.id} message={m.message}/>)

    const addNewMessage = (values: AddMessageFormValueType) => {
        props.sendMessage(values.newMessageBody)
    }

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
    )
}

