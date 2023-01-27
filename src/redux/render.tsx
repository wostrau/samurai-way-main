import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from '../App';
import {addPost, StateType, updateNewPostText} from './state';

export const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(<BrowserRouter>
        <App
            state={state}
            addPost={addPost}
            updateNewPostText={updateNewPostText}/>
    </BrowserRouter>, document.getElementById('root'));
};