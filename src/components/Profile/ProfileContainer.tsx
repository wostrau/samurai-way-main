import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {getUserProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import {LoginRedirect} from '../../hoc/LoginRedirect';


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

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
    }
};

const LoginRedirectComponent = LoginRedirect(ProfileContainer);
const ProfileContainerWithRouter = withRouter(LoginRedirectComponent);
export default connect(mapStateToProps, {getUserProfile})(ProfileContainerWithRouter);




