import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {StateType} from './redux/state';


export type AppPropsType = {
    state: StateType
    addPost: ()=>void
    updateNewPostText:(newText: string)=>void
};

function App(props: AppPropsType) {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route
                    path="/profile"
                    render={() => <Profile
                        profilePage={props.state.profilePage}
                        addPost={props.addPost}
                        updateNewPostText={props.updateNewPostText}
                    />}
                />
                <Route
                    path="/dialogs"
                    render={() => <Dialogs
                        dialogsPage={props.state.dialogsPage}
                    />}
                />
            </div>
        </div>
    );
}

export default App;
