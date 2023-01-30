import React from 'react';
import {DialogsReducerActionsType, sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';

export type DialogsPageType = {
    dialogs: Array<{
        id: string,
        name: string
    }>
    messages: Array<{
        id: string,
        message: string
    }>,
    newMessageBody: string,
};
type DialogsPropsType = {
    dialogsPage: DialogsPageType,
    dispatch: (action: DialogsReducerActionsType) => void;
};

export const DialogsContainer = (props: DialogsPropsType) => {
    const sendMessage = () => {
      props.dispatch(sendMessageAC());
    };
    const updateNewMessageBody = (message: string) => {
        props.dispatch(updateNewMessageBodyAC(message));
    };

    return <Dialogs
        dialogsPage={props.dialogsPage}
        sendMessage={sendMessage}
        updateNewMessageBody={updateNewMessageBody} />
};
