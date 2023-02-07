import React from 'react';
import styles from './FormControls.module.css';

const FormControl = ({input, meta, ...props}: any) => {
    const isError = meta.touched && meta.error;
    return (
        <div className={isError ? `${styles.formControl} ${styles.error}` : ''}>
            <div>{props.children}</div>
            {isError && <span>{meta.error}</span>}
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