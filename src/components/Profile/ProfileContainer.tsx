import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {getUserProfile} from '../../redux/profile-reducer';
import {Redirect, withRouter} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';


class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId = '25802';
        this.props.getUserProfile(userId);
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={'/login'}/>;

        return <Profile profile={this.props.profile}/>;
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
};

const ProfileContainerWithRouter = withRouter(ProfileContainer);
export default connect(mapStateToProps, {getUserProfile})(ProfileContainerWithRouter);