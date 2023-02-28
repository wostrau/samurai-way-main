import React, {ChangeEvent} from 'react';

export type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string | null
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    }

    deactivateEditMode() {
        this.setState({editMode: false});
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <>
                {
                    this.state.editMode
                        ? <div><input
                            autoFocus={true}
                            value={this.state.status}
                            onChange={this.onStatusChange.bind(this)}
                            onBlur={this.deactivateEditMode.bind(this)}
                            onKeyPress={(e) => e.key === 'Enter' && this.deactivateEditMode()}
                        /></div>
                        : <div><b>Status: </b><span onDoubleClick={this.activateEditMode}>{this.props.status || 'NO STATUS'}</span></div>
                }
            </>
        );
    }
}

