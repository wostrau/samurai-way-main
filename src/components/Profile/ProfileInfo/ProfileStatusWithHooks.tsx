import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

export const ProfileStatusWithHooks: React.FC<ProfileStatusPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status);

    useEffect(() => setStatus(props.status), [props]);

    const activateEditMode = () => setEditMode(true);
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    };
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value);

    return (
        <div>
            {editMode
                ? <div><input
                    autoFocus={true}
                    value={status}
                    onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                    onKeyPress={(e) => e.key === 'Enter' && deactivateEditMode()}
                /></div>
                : <div>
                    <b>Status: </b><span onDoubleClick={activateEditMode}>{status || 'NO STATUS'}</span>
                </div>
            }
        </div>
    );
};
