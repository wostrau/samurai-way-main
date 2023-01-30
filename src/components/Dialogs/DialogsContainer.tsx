import React from 'react';
import {sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogs-reducer';
import {StoreContext} from '../../redux/storeContext';
import {Dialogs} from './Dialogs';


/*export type DialogsPageType = {
    dialogs: Array<{
        id: string,
        name: string
    }>
    messages: Array<{
        id: string,
        message: string
    }>,
    newMessageBody: string,
};*/

export const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                const sendMessage = () => {
                    store.dispatch(sendMessageAC());
                };
                const updateNewMessageBody = (message: string) => {
                    store.dispatch(updateNewMessageBodyAC(message));
                };
                return (
                    <Dialogs
                        dialogsPage={store.getState().dialogsPage}
                        sendMessage={sendMessage}
                        updateNewMessageBody={updateNewMessageBody}/>
                );
            }}
        </StoreContext.Consumer>
    );
};
