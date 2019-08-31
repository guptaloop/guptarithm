import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.logoutUser = this.logoutUser.bind(this);
		this.getLinks = this.getLinks.bind(this);
	}

	logoutUser(e) {
		e.preventDefault();
		this.props.logout();
	}

	getLinks() {
		if (this.props.loggedIn) {
			return (
				<div>
					<Link to={'/accounts'}>All Accounts</Link>
					<Link to={'/profile'}>Profile</Link>
					<Link to={'/new_account'}>Create a new Account</Link>
					<button onClick={this.logoutUser}>Logout</button>
				</div>
			);
		} else {
			return (
				<div>
					<button 
						className="navbar-dropdown-link" 
						onClick={() => this.props.openModal('signup')}>
						Signup
					</button>
					<Link className="navbar-dropdown-link" to={'/login'}>Login</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="navbar-container">
				{this.getLinks()}
			</div>
		);
	}
}

export default NavBar;