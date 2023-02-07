import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/FormControls/FormControls';
import {requiredField} from '../../utilities/validators';

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={'login'}
                    component={Input}
                    validate={[requiredField]}
                    placeholder={'Login'}
                />
            </div>
            <div>
                <Field
                    name={'password'}
                    component={Input}
                    validate={[requiredField]}
                    placeholder={'Password'}
                />
            </div>
            <div>
                <Field
                    name={'rememberMe'}
                    component={'input'}
                    type={'checkbox'}
                />remember me
            </div>
            <div>
                <button>Log IN</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm);

export const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    };

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};