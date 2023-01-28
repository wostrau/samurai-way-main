import React from 'react';
import './index.css';
import {state, subscribe} from './redux/state';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {addPost, StateType, updateNewPostText} from './redux/state';


const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(<BrowserRouter>
        <App
            state={state}
            addPost={addPost}
            updateNewPostText={updateNewPostText}/>
    </BrowserRouter>, document.getElementById('root'));
};

rerenderEntireTree(state);
subscribe(rerenderEntireTree);