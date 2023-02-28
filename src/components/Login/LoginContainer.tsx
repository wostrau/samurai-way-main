import React from 'react'
import {AppStateType} from '../../redux/redux-store'
import {connect} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {Login} from './Login'


export type mSTPType = {
    isAuth: boolean
    captchaUrl: null | string
}
export type mDTPType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
} as mSTPType)

const LoginContainer = connect(mapStateToProps, {login} as mDTPType)(Login)

export default LoginContainer