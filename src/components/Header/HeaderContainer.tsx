import React from 'react';
import {AppStateType} from '../../redux/redux-store';
import {AuthType, setUserData} from '../../redux/auth-reducer';
import {connect} from 'react-redux';
import {Header} from './Header';
import axios from 'axios';

class HeaderContainer extends React.Component<AuthPropsType> {

    componentDidMount() {
        axios
            .get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true})
            .then(res => {
                if (res.data.resultCode === 0) {
                    const {id, email, login} = res.data.data;
                    this.props.setUserData({userId: id, email, login, isAuth: true});
                }
            });
    }

    render() {
        return <Header {...this.props}/>;
    }
}

const mapStateToProps = (state: AppStateType): AuthType => {
    return {
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    };
};

type MapDispatchToPropsType = { setUserData: (data: AuthType) => void };

export type AuthPropsType = AuthType & MapDispatchToPropsType;

export default connect(mapStateToProps, {setUserData} as MapDispatchToPropsType)(HeaderContainer);





