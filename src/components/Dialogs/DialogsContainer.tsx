import React from 'react';
import {
    DialogsPageType,
    DialogsReducerActionsType,
    sendMessageAC,
    updateNewMessageBodyAC
} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';


const mapStateToProps = (state: { dialogsPage: DialogsPageType }) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};
const mapDispatchToProps = (dispatch: (action: DialogsReducerActionsType) => void) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageAC());
        },
        updateNewMessageBody: (message: string) => {
            dispatch(updateNewMessageBodyAC(message));
        },
    }
};

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
