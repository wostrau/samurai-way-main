import React from 'react';
import styles from './FormControls.module.css';

const FormControl = ({meta: {touched, error}, children}: any) => {
    const isError = touched && error;
    return (
        <div className={isError ? `${styles.formControl} ${styles.error}` : ''}>
            <div>{children}</div>
            {isError && <span>{error}</span>}
        </div>
    );
};

export const Textarea = (props: any) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea
                cols={30}
                rows={3}
                {...input}
                {...restProps}
            />
        </FormControl>
    );
};

export const Input = (props: any) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input
                {...input}
                {...restProps}
            />
        </FormControl>
    );
};