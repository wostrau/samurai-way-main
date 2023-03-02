import React from 'react';
import {
    DialogsStateType,
    DialogsReducerActionsType,
    dialogsAction
} from '../../redux/dialogs-reducer'
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {compose, Dispatch} from 'redux';
import {withRedirectToLogin} from '../../hoc/WithRedirectToLogin';

type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
};

export type DialogsPropsType = DialogsStateType & MapDispatchToPropsType & any;

const mapStateToProps = (state: AppStateType): DialogsStateType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    };
};
const mapDispatchToProps = (dispatch: Dispatch<DialogsReducerActionsType>): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => dispatch(dialogsAction.sendMessage(newMessageBody))
    };
};

const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRedirectToLogin
)(Dialogs);

export default DialogsContainer;