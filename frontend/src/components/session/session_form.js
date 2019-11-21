import React from 'react';
import 'react-awesome-button/dist/styles.css';

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '', errors: {} };
		this.handleAuth = this.handleAuth.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
		this.clearedErrors = false;
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({ errors: nextProps.errors });
	}

	handleUpdate(field) {
		return e => this.setState({ [field]: e.currentTarget.value });
	}

	handleAuth(e) {
		e.preventDefault();

		const auth = this.props.formType === 'signup' ? 
			this.props.signup : this.props.login;

		let user = {
			username: this.state.username,
			password: this.state.password,
		};

		auth(user, this.props.history)
			.then(() => {
				if (this.props.errors.length === 0) {
					this.props.closeModal();
				}
			});
	}

	renderErrors() {
		return (
			<ul>
				{Object.keys(this.state.errors).map((error, i) => (
					<li key={`error-${i}`}>
						{this.state.errors[error]}
					</li>
				))}
			</ul>
		);
	}

	render() {
		const altButtonStyle = this.props.formType === 'login' ? 
			{ top: '320px' } : { top: '320px' }
		console.log(this.props);
		return (
			<>
				<div className="session-form-container">
					<form onSubmit={this.handleAuth} >
						
						<div className="session-form">
							<p>Username</p>
							<input type="text"
								value={this.state.username}
								onChange={this.handleUpdate('username')}
							/>
							<p>Password</p>
							<input type="password"
								value={this.state.password}
								onChange={this.handleUpdate('password')}
							/>
							<br></br>
							<input className="submit" type="submit" value={this.state.formType} />
							<br></br>
							<div className="alternate-buttons" style={altButtonStyle}>
								{this.props.formType === 'signup' ?
									<>
										<span>Already have an account?</span>
										<button onClick={this.props.openLoginModal}>Login</button>
									</>	:	<>
										<span>Don't have an account?</span>
										<button onClick={this.props.openSignupModal}>Signup</button>
									</>
								}
							</div>
							<span className='session-errors'>{this.renderErrors()}</span>
						</div>
					</form>
				</div>
			</>
		);
	}
}

export default SessionForm;