import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Input} from '../common/FormControls/FormControls'
import {requiredField} from '../../utilities/validators'
import styles from '../common/FormControls/FormControls.module.css'
import React from 'react'


type CaptchaType = { captchaUrl: null | string };
export type LoginFormValueType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValueType, CaptchaType> & CaptchaType> = (props) => {
    const {handleSubmit, error, captchaUrl} = props;

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
            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
            {captchaUrl && <Field
                name={'captcha'}
                placeholder={'Symbols from image above'}
                component={Input}
                validate={[requiredField]}
            />}
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Log IN</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<LoginFormValueType, CaptchaType>({form: 'login'})(LoginForm)
