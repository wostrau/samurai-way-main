import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {ActionsType, StateType} from './redux/state';


export type AppPropsType = {
    state: StateType
    dispatch: (action: ActionsType) => void;
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
                        dispatch={props.dispatch}
                    />}
                />
                <Route
                    path="/dialogs"
                    render={() => <Dialogs
                        dialogsPage={props.state.dialogsPage}
                        dispatch={props.dispatch}
                    />}
                />
            </div>
        </div>
    );
}

export default App;
