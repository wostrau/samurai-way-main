import React from 'react';
import {AppStateType} from '../../redux/redux-store';
import {AuthStateType, logout} from '../../redux/auth-reducer';
import {connect} from 'react-redux';
import {Header} from './Header';
import {compose} from 'redux';

class HeaderContainer extends React.Component<AuthPropsType> {
    render() {
        return <Header {...this.props}/>;
    }
}

const mapStateToProps = (state: AppStateType): AuthStateType => {
    return {
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    };
};

type MapDispatchToPropsType = { logout: () => void };
export type AuthPropsType = AuthStateType & MapDispatchToPropsType;

export default compose(
    connect(mapStateToProps, {logout} as MapDispatchToPropsType),
)(HeaderContainer);





