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
					<button className="navbar-link" onClick={() => this.props.openModal			('signup')}>Signup</button>
					<button className="navbar-link" onClick={() => this.props.openModal			('login')}>Login</button>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="navbar-container">
				<button>
					<Link to={'/'} className="navbar-home-link">MADHU</Link>
				</button>
				{this.getLinks()}
			</div>
		);
	}
}

export default NavBar;