import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {
    getUserProfile,
    getUserStatus,
    ProfileResponseType,
    savePhoto,
    saveProfile,
    updateUserStatus
} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import {withRedirectToLogin} from '../../hoc/WithRedirectToLogin';
import {compose} from 'redux';


class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    mountProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
            if (!userId) this.props.history.push('/login');
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.mountProfile();
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) this.mountProfile();
    }

    render() {
        return <Profile
            {...this.props}
            isOwner={!this.props.match.params.userId}
            profile={this.props.profile}
            status={this.props.status}
            updateUserStatus={this.props.updateUserStatus}
            savePhoto={this.props.savePhoto}
            saveProfile={this.props.saveProfile}
        />;
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userId: state.auth.userId,
        isAuth: state.auth.isAuth
    } as MapStateToPropsType
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateUserStatus,
        savePhoto,
        saveProfile
    } as unknown as MapDispatchToPropsType),
    withRouter,
    withRedirectToLogin
)(ProfileContainer);

type PathParamsType = { userId: string };
type MapDispatchToPropsType = {
    getUserProfile: (id: string) => void
    getUserStatus: (id: string) => void
    updateUserStatus: (status: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfileResponseType) => Promise<void>
};
type MapStateToPropsType = {
    profile: ProfileResponseType
    status: string
    userId: string
    isAuth: boolean
};
type ProfileContainerPropsType =
    MapStateToPropsType
    & MapDispatchToPropsType
    & RouteComponentProps<PathParamsType>;

