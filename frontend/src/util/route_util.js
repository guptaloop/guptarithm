import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => (
	<Route path={path} exact={exact} render={(props) => (
		!loggedIn ? (
			<Component {...props} />
		) : (
			// Redirect to the accounts page if the user is authenticated
			<Redirect to="/accounts" />
		)
	)} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			loggedIn ? (
				<Component {...props} />
			) : (
				// Redirect to the splash page if the user is NOT authenticated
				<Redirect to="/" />
			)
		}
	/>
);

// Use the isAuthenticated slice of state to determine if a user is logged in
const mapStateToProps = state => (
	{ loggedIn: state.session.isAuthenticated }
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
