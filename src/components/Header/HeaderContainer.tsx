import React from 'react';
import {AppStateType} from '../../redux/redux-store';
import {AuthType, getAuthUserData, logout} from '../../redux/auth-reducer';
import {connect} from 'react-redux';
import {Header} from './Header';
import {compose} from 'redux';

class HeaderContainer extends React.Component<AuthPropsType> {

    componentDidMount() {
        this.props.getAuthUserData()
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

type MapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
};

export type AuthPropsType = AuthType & MapDispatchToPropsType;

export default compose(
    connect(mapStateToProps, {getAuthUserData, logout} as MapDispatchToPropsType),
)(HeaderContainer);





