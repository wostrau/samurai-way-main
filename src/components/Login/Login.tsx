import React from 'react'
import {Redirect} from 'react-router-dom'
import {LoginFormValueType, LoginReduxForm} from './LoginForm'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import {login} from '../../redux/auth-reducer'

const Login: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValueType) => {
        const {email, password, rememberMe, captcha} = formData
        dispatch(login(email, password, rememberMe, captcha))
    }

    if (isAuth) return <Redirect to={'/profile'}/>

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={captchaUrl}
            />
        </div>
    )
}

export default Login