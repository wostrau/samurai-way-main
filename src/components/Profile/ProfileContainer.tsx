import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {getUserProfile} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import {withRedirectToLogin} from '../../hoc/WithRedirectToLogin';
import {compose} from 'redux';

type MapDispatchToPropsType = {
    getUserProfile: (id: string) => void
    getUserStatus: (id: string) => void
};
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
type ProfileContainerPropsType =
    { profile: ProfileResponseType }
    & MapDispatchToPropsType
    & RouteComponentProps<PathParamsType>;
type PathParamsType = { userId: string };

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId = '25802';
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return <Profile {...this.props}/>;
    }
}


type MapStateToPropsType = {
    profile: ProfileResponseType
    status: string
};
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus} as MapDispatchToPropsType),
    withRouter,
    withRedirectToLogin
)(ProfileContainer);



