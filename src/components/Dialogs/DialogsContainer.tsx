import React from 'react';
import {
    DialogsPageType,
    DialogsReducerActionsType,
    sendMessageAC
} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {compose, Dispatch} from 'redux';
import {withRedirectToLogin} from '../../hoc/WithRedirectToLogin';

type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
};

export type DialogsPropsType = DialogsPageType & MapDispatchToPropsType & any;

const mapStateToProps = (state: AppStateType): DialogsPageType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    };
};
const mapDispatchToProps = (dispatch: Dispatch<DialogsReducerActionsType>): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => dispatch(sendMessageAC(newMessageBody))
    };
};

const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRedirectToLogin
)(Dialogs);

export default DialogsContainer;