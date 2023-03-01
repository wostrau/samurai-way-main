import React from 'react'
import styles from './FormControls.module.css'
import {WrappedFieldMetaProps} from 'redux-form'


type FormControlPropsType = { meta: WrappedFieldMetaProps }

const FormControl: React.FC<FormControlPropsType> = (props) => {
    const {meta, children} = props
    const isError = meta.touched && meta.error
    return (
        <div className={isError ? `${styles.formControl} ${styles.error}` : ''}>
            <div>{children}</div>
            {isError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <textarea
                cols={30}
                rows={3}
                {...input}
                {...restProps}
            />
        </FormControl>
    )
}

export const Input = (props: any) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <input
                {...input}
                {...restProps}
            />
        </FormControl>
    )
}