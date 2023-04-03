import React from 'react'
import './App.css'
import 'antd/dist/reset.css'
import {Navbar} from './components/Navbar/Navbar'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import {AppStateType} from './redux/redux-store'
import {Preloader} from './components/common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import {withSuspense} from './hoc/WithSuspense'
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons'
import type {MenuProps} from 'antd'
import {Avatar, Breadcrumb, Layout, Menu, theme} from 'antd'
import Link from 'antd/es/typography/Link'
import {Header} from './components/Header/Header'


const {Content, Sider, Footer} = Layout
const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`
}))
const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1)

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1
                return {
                    key: subKey,
                    label: `option${subKey}`
                }
            })
        }
    }
)
const {token: {colorBgContainer}} = theme.useToken()


const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const Login = React.lazy(() => import('./components/Login/Login'))
const Users = React.lazy(() => import('./components/Users/Users'))


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
        const ProfileContainerWithSuspense = withSuspense(ProfileContainer)
        const DialogsContainerWithSuspense = withSuspense(DialogsContainer)
        const LoginWithSuspense = withSuspense(Login)
        const UsersWithSuspense = withSuspense(Users)


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
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                                items={items2}
                            />
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>

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
