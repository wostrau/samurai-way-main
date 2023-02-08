import React from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Route, withRouter} from 'react-router-dom';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {LoginContainer} from './components/Login/LoginContainer';
import {getAuthUserData} from './redux/auth-reducer';
import {connect} from 'react-redux';
import {compose} from 'redux';


class App extends React.Component<MapDispatchToPropsType> {
    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route
                        path="/profile/:userId?"
                        render={() => <ProfileContainer/>}
                    />
                    <Route
                        path="/dialogs"
                        render={() => <DialogsContainer/>}
                    />
                    <Route
                        path="/users"
                        render={() => <UsersContainer/>}
                    />
                    <Route
                        path="/login"
                        render={() => <LoginContainer/>}
                    />
                </div>
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect(null, {getAuthUserData} as MapDispatchToPropsType)
)(App);
type MapDispatchToPropsType = { getAuthUserData: () => void };