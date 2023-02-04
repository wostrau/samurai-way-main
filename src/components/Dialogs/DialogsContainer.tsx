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
import {LoginRedirect} from '../../hoc/LoginRedirect';

type MapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageBody: (message: string) => void
};

export type DialogsPropsType = DialogsPageType & MapDispatchToPropsType & any;

const mapStateToProps = (state: AppStateType): DialogsPageType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody,
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

const LoginRedirectComponent = LoginRedirect(Dialogs)
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(LoginRedirectComponent);
