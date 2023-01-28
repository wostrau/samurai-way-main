import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {StateType, store} from './redux/state';


const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(<BrowserRouter>
        <App
            state={state}
            dispatch={store.dispatch.bind(store)}
        />
    </BrowserRouter>, document.getElementById('root'));
};

rerenderEntireTree(store.getState());
store.subscribe(rerenderEntireTree);