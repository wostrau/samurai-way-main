import React from 'react';

export class ProfileStatus extends React.Component<{ status: string }> {
    state = {editMode: false}

    activateEditMode() {
        this.setState({editMode: true});
    }

    deactivateEditMode() {
        this.setState({editMode: false});
    }

    render() {
        return (
            <>
                {
                    this.state.editMode
                        ? <div><input
                            autoFocus={true}
                            value={this.props.status}
                            onBlur={this.deactivateEditMode.bind(this)}
                            onKeyPress={(e) => e.key === 'Enter' && this.deactivateEditMode()}
                        /></div>
                        : <div><span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span></div>
                }
            </>
        );
    }
}

