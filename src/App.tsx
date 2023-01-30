import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import {store} from './redux/redux-store';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';


function App() {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route
                    path="/profile"
                    render={() => <Profile
                        profilePage={store.getState().profilePage}
                        dispatch={store.dispatch}
                    />}
                />
                <Route
                    path="/dialogs"
                    render={() => <DialogsContainer
                        dialogsPage={store.getState().dialogsPage}
                        dispatch={store.dispatch}
                    />}
                />
            </div>
        </div>
    );
}

export default App;
