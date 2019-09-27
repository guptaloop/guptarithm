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
					<button className="navbar-link" onClick={this.logoutUser}>
						Logout</button>
				</div>
			);
		} else {
			return (
				<div>
					<button className="navbar-link" 
						onClick={() => this.props.openModal('login')}>Login</button>
					<button className="navbar-link" 
						onClick={() => this.props.openModal('signup')}>Signup</button>
					<button className="navbar-link-demo" 
						onClick={() => this.props.openModal('login')}>Demo</button>
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