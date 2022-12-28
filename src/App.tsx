import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';

export type StateType = {
    state: {
        profilePage: {
            posts: Array<{
                id: number,
                message: string,
                likesCount: number
            }>
        },
        dialogsPage: {
            dialogs: Array<{
                id: number,
                name: string
            }>,
            messages: Array<{
                id: number,
                message: string
            }>
        }
    }
};

function App(props: StateType) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route
                        path="/profile"
                        render={() => <Profile
                            profilePage={props.state.profilePage}
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
        </BrowserRouter>
    );
}

export default App;
