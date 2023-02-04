import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {getUserProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';


class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId = '25802';
        this.props.getUserProfile(userId);
    }

    render() {
        return <Profile profile={this.props.profile}/>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profile,
    }
};

const ProfileContainerWithRouter = withRouter(ProfileContainer);
export default connect(mapStateToProps, {getUserProfile})(ProfileContainerWithRouter);