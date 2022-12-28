import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const posts = [
    {id: 1, message: 'Hi, how are you?', likesCount: 5},
    {id: 2, message: 'It\'s my first post!', likesCount: 7}
];
const dialogs = [
    {id: 1, name: 'DIMYCH'},
    {id: 2, name: 'ANDREW'}
];
const messages = [
    {id: 1, message: 'Hi, how are you?'},
    {id: 2, message: 'I\'m fine, thanks'},
    {id: 3, message: 'What are your plans?'},
    {id: 4, message: 'Go for a walk this evening'}
];

ReactDOM.render(
    <App
        posts={posts}
        dialogs={dialogs}
        messages={messages}
    />,
    document.getElementById('root')
);