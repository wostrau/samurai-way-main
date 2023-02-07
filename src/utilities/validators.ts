export const requiredField = (value: any) => {
    if (value) return undefined;
    return 'field is required';
};

const maxLength = (max: number) => (value: string | any[]) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength30 = maxLength(30)

const minLength = (min: number) => (value: string | any[]) =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)