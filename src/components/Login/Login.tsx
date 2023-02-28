import React from 'react'
import {Redirect} from 'react-router-dom'
import {FormDataType, LoginReduxForm} from './LoginForm'
import {mDTPType, mSTPType} from './LoginContainer'

export const Login: React.FC<mDTPType & mSTPType> = (props) => {
    const {login, isAuth, captchaUrl} = props;

    const onSubmit = (formData: FormDataType) => {
        const {email, password, rememberMe, captcha} = formData;
        login(email, password, rememberMe, captcha);
    };

    if (isAuth) return <Redirect to={'/profile'}/>;

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={captchaUrl}
            />
        </div>
    );
};