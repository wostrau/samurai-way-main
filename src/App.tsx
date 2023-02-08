import React from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Route, withRouter} from 'react-router-dom';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {LoginContainer} from './components/Login/LoginContainer';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {AppType, initializeApp} from './redux/app-reducer';
import {AppStateType} from './redux/redux-store';
import {Preloader} from './components/common/Preloader/Preloader';


class App extends React.Component<MapDispatchToPropsType & AppType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) return <Preloader/>;
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
const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized} as AppType);
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp} as MapDispatchToPropsType)
)(App);
type MapDispatchToPropsType = { initializeApp: () => void };