import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getUserStatus, updateUserStatus} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import {withRedirectToLogin} from '../../hoc/WithRedirectToLogin';
import {compose} from 'redux';


class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId = this.props.userId;
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return <Profile
            {...this.props}
            profile={this.props.profile}
            status={this.props.status}
            updateUserStatus={this.props.updateUserStatus}
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
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus} as MapDispatchToPropsType),
    withRouter,
    withRedirectToLogin
)(ProfileContainer);

//types -- types -- types -- types -- types -- types
export type ProfileResponseType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: {
        github: string,
        vk: string,
        facebook: string,
        instagram: string,
        twitter: string,
        website: string,
        youtube: string,
        mainLink: string
    },
    photos: { small: string, large: string }
};
type PathParamsType = { userId: string };
type MapDispatchToPropsType = {
    getUserProfile: (id: string) => void
    getUserStatus: (id: string) => void
    updateUserStatus: (status: string) => void
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

