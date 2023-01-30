import React from 'react';
import {store} from './redux-store';

export const StoreContext = React.createContext(store);

export const Provider = (props: any) => {
    return (
        <StoreContext.Provider
            value={props.store}
        >{props.children}
        </StoreContext.Provider>
    );
};