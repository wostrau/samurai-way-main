import React from 'react'
import {dialogsAction, DialogsStateType} from '../../redux/dialogs-reducer'
import {Dialogs} from './Dialogs'
import {connect} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import {compose} from 'redux'
import {withRedirectToLogin} from '../../hoc/WithRedirectToLogin'

export type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
};

const mapStateToProps = (state: AppStateType): DialogsStateType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    };
};

const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {...dialogsAction} as MapDispatchToPropsType),
    withRedirectToLogin
)(Dialogs);

export default DialogsContainer;