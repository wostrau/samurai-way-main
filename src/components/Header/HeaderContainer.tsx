import React from 'react';
import {AppStateType} from '../../redux/redux-store';
import {AuthType, getAuthUserData} from '../../redux/auth-reducer';
import {connect} from 'react-redux';
import {Header} from './Header';

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

type MapDispatchToPropsType = { getAuthUserData: () => void };

export type AuthPropsType = AuthType & MapDispatchToPropsType;

export default connect(mapStateToProps, {getAuthUserData} as MapDispatchToPropsType)(HeaderContainer);





