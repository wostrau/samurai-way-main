import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.isAuth,
    };
};

export const withRedirectToLogin = (Component: any) => {
  class RedirectComponent extends React.Component<any, any> {
      render() {
          if(!this.props.isAuth) return <Redirect to='/login'/>
          return <Component {...this.props}/>
      }
  }
  return connect(mapStateToProps)(RedirectComponent);
};