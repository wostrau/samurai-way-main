import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Textarea} from '../../../common/FormControls/FormControls'
import {maxLength30, minLength2, requiredField} from '../../../../utilities/validators'
import React from 'react'


export type FormDataType = { newPostText: string }

const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={'newPostText'}
                    component={Textarea}
                    placeholder={'add your post here'}
                    validate={[requiredField, maxLength30, minLength2]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<FormDataType>({form: 'addNewPostForm'})(AddNewPostForm)