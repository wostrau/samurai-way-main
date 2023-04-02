import {Field, Form, Formik} from 'formik'
import React from 'react'
import {FilterType} from '../../redux/users-reducer'
import {useSelector} from 'react-redux'
import {selectFilter} from '../../redux/users-selectors'

const usersSearchFormValidate = (values: any) => {
    return {}
}

type FriendFormType = 'null' | 'true' | 'false'
type UsersSearchFormFilterType = {
    term: string
    friend: FriendFormType
}

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo(({onFilterChanged}) => {

    const filter = useSelector(selectFilter)

    const onSubmit = (values: UsersSearchFormFilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }

        onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
                validate={usersSearchFormValidate}
                onSubmit={onSubmit}
                enableReinitialize
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