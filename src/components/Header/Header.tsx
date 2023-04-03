import React from 'react'
import {AuthPropsType} from './HeaderContainer'
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import Link from 'antd/es/typography/Link'
import {UserOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {selectIsAuth, selectLogin} from '../../redux/auth-selectors'
import {logout} from '../../redux/auth-reducer'
import {NavLink} from 'react-router-dom'

export const Header: React.FC<AuthPropsType> = (props) => {
    const {Header} = Layout
    const isAuth = useSelector(selectIsAuth)

    const login = useSelector(selectLogin)

    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                    >
                        <Menu.Item key={'1'}>
                            <Link to={'/developers'}>Developers</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={6}>
                    {isAuth
                        ? <div>
                            <Avatar
                                style={{backgroundColor: '#87d068'}}
                                icon={<UserOutlined/>}
                            />
                            {login} <Button onClick={logoutCallback}>Log out</Button>
                        </div>
                        : <NavLink
                            to={'/login'}
                        >Login</NavLink>
                    }

                </Col>
            </Row>
        </Header>
    )
}


/*<header className={styles.header}>
    <img src="src/components/Header/Header" alt=""/>
    <div className={styles.loginBlock}>
        {props.isAuth
            ? <div>{props.login} / <button onClick={props.logout}>Log OUT</button></div>
            : <NavLink to={'/login'}>Login</NavLink>}
    </div>
</header>*/