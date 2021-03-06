import React from 'react';

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
				<div className="navbar-dash">
					<h2>Welcome, {this.props.user.username}!</h2>
					<button onClick={() => this.props.openModal('runAlgo')}
						className="run-algo"
						>View Trade Recs
					</button>
					<button onClick={this.logoutUser}>Logout</button>
				</div>
			);
		} else {
			const demoUser = { username: "Kurt_Russell", password: "123456" };
			return (
				<div className="navbar-splash">
					<button onClick={() => this.props.openModal('login')}>
						Login</button>
					<button onClick={() => this.props.openModal('signup')}>
						Signup</button>
					<button onClick={() => this.props.demoLogin(demoUser)} className="demo">Demo</button>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				{this.getLinks()}
			</div>
		);
	}
}

export default NavBar;