import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';

export type AppPropsType = {
    posts: Array<{
        id: number,
        message: string,
        likesCount: number
    }>
    dialogs: Array<{
        id: number,
        name: string
    }>
    messages: Array<{
        id: number,
        message: string
    }>
};

function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route
                        path="/profile"
                        render={() => <Profile
                            posts={props.posts}
                        />}
                    />
                    <Route
                        path="/dialogs"
                        render={() => <Dialogs
                            dialogs={props.dialogs}
                            messages={props.messages}
                        />}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
