import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from '../App';
import {addPost, StateType} from './state';

export const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(<BrowserRouter>
        <App state={state} addPost={addPost}/>
    </BrowserRouter>, document.getElementById('root'));
};