import React from 'react'
import './App.css'
import {Navbar} from './components/Navbar/Navbar'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import {AppStateType} from './redux/redux-store'
import {Preloader} from './components/common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import {withSuspense} from './hoc/WithSuspense'

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const Login = React.lazy(() => import('./components/Login/Login'))
const Users = React.lazy(() => import('./components/Users/Users'))


type DispatchToPropsType = { initializeApp: () => void }
type MapStateToPropsType = ReturnType<typeof mapStateToProps>

class App extends React.Component<DispatchToPropsType & MapStateToPropsType> {
    catchAllUnhandledErrors(e: PromiseRejectionEvent) {
        alert('some error occurred')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) return <Preloader/>
        const ProfileContainerWithSuspense = withSuspense(ProfileContainer)
        const DialogsContainerWithSuspense = withSuspense(DialogsContainer)
        const LoginWithSuspense = withSuspense(Login)
        const UsersWithSuspense = withSuspense(Users)

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route
                            exact={true}
                            path="/"
                            render={() => <Redirect to={'/profile'}/>}
                        />
                        <Route
                            path="/profile/:userId?"
                            render={() => <ProfileContainerWithSuspense/>}
                        />
                        <Route
                            path="/dialogs"
                            render={() => <DialogsContainerWithSuspense/>}
                        />
                        <Route
                            path="/login"
                            render={() => <LoginWithSuspense/>}
                        />
                        <Route
                            path="/users"
                            render={() => <UsersWithSuspense/>}
                        />
                        <Route
                            path="*"
                            render={() => <div>404 PAGE NOT FOUND</div>}
                        />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp} as DispatchToPropsType)
)(App)
