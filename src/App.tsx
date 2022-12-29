import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';

export type AppPropsType = {
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
    },
    addPost: (post: string) => void
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
