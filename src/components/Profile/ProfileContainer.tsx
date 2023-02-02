import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {Profile} from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUserProfile} from '../../redux/profile-reducer';


class ProfileContainer extends React.Component<any, any> {

    setUserId(userId: string | number) {
        return userId.toString();
    }

    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/${this.setUserId(2)}`)
            .then(res => {
                this.props.setUserProfile(res.data);
            });
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

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);