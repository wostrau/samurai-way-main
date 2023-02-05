import React, {ComponentType} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppStateType} from '../redux/redux-store';

type MapStateToPropsType = { isAuth: boolean };
const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
    } as MapStateToPropsType;
};

export function withRedirectToLogin<T>(Component: ComponentType<T>) {
    class RedirectComponent extends React.Component<MapStateToPropsType> {
        render() {
            const {isAuth, ...restProps} = this.props;
            if (!isAuth) return <Redirect to="/login"/>
            return <Component {...restProps as T}/>
        }
    }
    return connect(mapStateToProps)(RedirectComponent);
}