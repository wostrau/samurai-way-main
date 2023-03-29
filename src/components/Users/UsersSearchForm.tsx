import {ErrorMessage, Field, Form, Formik} from 'formik'
import React from 'react'
import {FilterType} from '../../redux/users-reducer'

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type UsersSearchFormFilterType = {
    term: string
    friend: 'null' | 'true' | 'false'
}

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo(({onFilterChanged}) => {
    const onSubmit = (values: UsersSearchFormFilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: '', friend: 'null'}}
                validate={usersSearchFormValidate}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Search
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})