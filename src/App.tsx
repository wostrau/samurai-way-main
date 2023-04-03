import React from 'react'
import './App.css'
import 'antd/dist/reset.css'
import {Navbar} from './components/Navbar/Navbar'
import {Link, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import {AppStateType} from './redux/redux-store'
import {Preloader} from './components/common/Preloader/Preloader'
import {withSuspense} from './hoc/WithSuspense'
import {Breadcrumb, Layout, Menu, theme} from 'antd'
import {Header} from './components/Header/Header'
import SubMenu from 'antd/es/menu/SubMenu'
import {UserOutlined} from '@ant-design/icons'


const {Content, Sider, Footer} = Layout
const {token: {colorBgContainer}} = theme.useToken()


const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const Login = React.lazy(() => import('./components/Login/Login'))
const Users = React.lazy(() => import('./components/Users/Users'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))


type DispatchToPropsType = { initializeApp: () => void }
type MapStateToPropsType = ReturnType<typeof mapStateToProps>


class App extends React.Component<DispatchToPropsType & MapStateToPropsType> {
    catchAllUnhandledErrors(e: PromiseRejectionEvent) {
        //alert('some error occurred')
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
        const SuspendedProfileContainer = withSuspense(ProfileContainer)
        const SuspendedDialogsContainer = withSuspense(DialogsContainer)
        const SuspendedLogin = withSuspense(Login)
        const SuspendedUsers = withSuspense(Users)
        const SuspendedChatPage = withSuspense(ChatPage)

        return (
            <Layout>
                <Header/>

                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{padding: '24px 0', background: colorBgContainer}}>
                        <Sider style={{background: colorBgContainer}} width={200}>
                            <Menu
                                mode="inline"
                                style={{height: '100%'}}
                            >
                                <SubMenu key={'sub1'} icon={<UserOutlined/>} title={'My Profile'}>
                                    <Menu.Item key={'1'}><Link to={'/profile'}>Profile</Link></Menu.Item>
                                    <Menu.Item key={'2'}><Link to={'/dialogs'}>Dialogs</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key={'sub2'} icon={<UserOutlined/>} title={'Developers'}>
                                    <Menu.Item key={'3'}><Link to={'/chat'}>Chat</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>

                            <div className="app-wrapper">
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
                                            render={() => <SuspendedProfileContainer/>}
                                        />
                                        <Route
                                            path="/dialogs"
                                            render={() => <SuspendedDialogsContainer/>}
                                        />
                                        <Route
                                            path="/login"
                                            render={() => <SuspendedLogin/>}
                                        />
                                        <Route
                                            path="/users"
                                            render={() => <SuspendedUsers/>}
                                        />
                                        <Route
                                            path="/chat"
                                            render={() => <SuspendedChatPage/>}
                                        />
                                        <Route
                                            path="*"
                                            render={() => <div>404 PAGE NOT FOUND</div>}
                                        />
                                    </Switch>
                                </div>
                            </div>

                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp} as DispatchToPropsType)
)(App)
