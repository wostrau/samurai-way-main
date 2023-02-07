import React from 'react';
import {Field, reduxForm} from 'redux-form';

const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field name={'login'} component={'input'} placeholder={'Login'}/></div>
            <div><Field name={'password'} component={'input'} placeholder={'Password'}/></div>
            <div><Field name={'rememberMe'} component={'input'} type={'checkbox'}/>remember me</div>
            <div><button>Log IN</button></div>
        </form>
    );
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

export const Login = (props: any) => {
    const onSubmit = (formData: any) => {console.log(formData)};

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};