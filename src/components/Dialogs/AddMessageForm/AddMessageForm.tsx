import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Textarea} from '../../common/FormControls/FormControls'
import {maxLength30, minLength2, requiredField} from '../../../utilities/validators'

export type AddMessageFormValueType = { newMessageBody: string }

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormValueType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name={'newMessageBody'}
                    component={Textarea}
                    validate={[requiredField, maxLength30, minLength2]}
                    placeholder="type new message"
                    cols={30}
                    rows={5}
                />
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<AddMessageFormValueType>({form: 'AddMessageForm'})(AddMessageForm)