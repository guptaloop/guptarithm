import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

// Use the isAuthenitcated slice of state to determine if a user is logged in
const mapStateToProps = state => (
	{ loggedIn: state.session.isAuthenticated }
);

// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={props =>
		// Redirect to the tweets page if the user is authenticated
    !loggedIn ? (<Component {...props} />) : (<Redirect to="/accounts" />)
	}/>
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route {...rest} render={props =>
		// Redirect to the login page unless user is already authenticated
		loggedIn ? (<Component {...props} />) : (<Redirect to="/login" />)
	}/>
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));