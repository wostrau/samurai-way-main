import React from 'react';
import {Input, Textarea} from '../../common/FormControls/FormControls';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {ContactsType} from '../../../redux/profile-reducer';
import styles from '../../common/FormControls/FormControls.module.css';


export type ProfileDataFormType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
};
type ContactsPropsType = { contacts: ContactsType }


const ProfileDataForm = (props: InjectedFormProps<ProfileDataFormType, ContactsPropsType> & ContactsPropsType) => {
    const {handleSubmit, contacts, error} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div><button>save</button></div>
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <b>Full name</b>
                <Field
                    name={'fullName'}
                    placeholder={'Full name'}
                    component={Input}
                    validate={[]}
                />
            </div>
            <div>
                <b>About me</b>
                <Field
                    name={'aboutMe'}
                    placeholder={'About me'}
                    component={Textarea}
                    validate={[]}
                />
            </div>
            <div>
                <b>Looking for a job</b>
                <Field
                    name={'lookingForAJob'}
                    component={Input}
                    type={'checkbox'}
                />
            </div>
            <div>
                <b>Skills</b>
                <Field
                    name={'lookingForAJobDescription'}
                    placeholder={'Professional skills'}
                    component={Textarea}
                    validate={[]}
                />
            </div>
            <div>
                <b>Contacts</b>
                {contacts && Object.entries(contacts).map(([key]) => {
                    return (
                        <div key={key} style={{paddingLeft: '10px'}}>
                            <b>{key}: </b>
                            <Field
                                name={`contacts.${key}`}
                                placeholder={`${key} url`}
                                component={Input}
                            />
                        </div>
                    );
                })
                }
            </div>
        </form>
    )
        ;
};

const ProfileDataReduxForm = reduxForm<ProfileDataFormType, ContactsPropsType>({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataReduxForm;