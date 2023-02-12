import React, {ChangeEvent} from 'react';

export type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

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

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) {
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

