import React from 'react';
import {
    DialogsPageType,
    DialogsReducerActionsType,
    sendMessageAC,
    updateNewMessageBodyAC
} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';

type MapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageBody: (message: string) => void
};

export type DialogsPropsType = DialogsPageType & MapDispatchToPropsType & any;

const mapStateToProps = (state: AppStateType): any => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody,
        isAuth: state.auth.isAuth
    };
};
const mapDispatchToProps = (dispatch: Dispatch<DialogsReducerActionsType>): MapDispatchToPropsType => {
    return {
        sendMessage: () => {
            dispatch(sendMessageAC());
        },
        updateNewMessageBody: (message: string) => {
            dispatch(updateNewMessageBodyAC(message));
        },
    };
};

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
