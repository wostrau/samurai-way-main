import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/FormControls/FormControls';
import {requiredField} from '../../utilities/validators';
import {connect} from 'react-redux';
import {login, logout} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Redirect} from 'react-router-dom';
import styles from '../common/FormControls/FormControls.module.css';

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm = ({handleSubmit, error}: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name={'email'}
                    placeholder={'Email'}
                    component={Input}
                    validate={[requiredField]}
                />
            </div>
            <div>
                <Field
                    name={'password'}
                    placeholder={'Password'}
                    component={Input}
                    validate={[requiredField]}
                    type={'password'}
                />
            </div>
            <div>
                <Field
                    name={'rememberMe'}
                    component={Input}
                    type={'checkbox'}
                />remember me
            </div>
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Log IN</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm);

const Login = (props: mDTPType & mSTPType) => {
    const onSubmit = (formData: FormDataType) => {
        const {email, password, rememberMe} = formData;
        props.login(email, password, rememberMe);
    };

    if (props.isAuth) return <Redirect to={'/profile'}/>;

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

type mDTPType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    logout: () => void
}
type mSTPType = { isAuth: boolean }
const mapStateToProps = (state: AppStateType) => ({isAuth: state.auth.isAuth} as mSTPType);
export default connect(mapStateToProps, {login, logout} as mDTPType)(Login);