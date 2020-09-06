import React, { Component } from 'react';

export default class AddAccountForm extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			custodian: '',
			type: '',
			last4: '',
			errors: {}
		};
		this.handleNewAccount = this.handleNewAccount.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
		this.clearedErrors = false;
	}
	
	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({ errors: nextProps.errors });
	}

	handleUpdate(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleNewAccount(e) {
		e.preventDefault();
		let account = {
			userId: this.props.user.id,
			custodian: this.state.custodian,
			type: this.state.type,
			last4: this.state.last4,
		};
		this.props.createAccount(account, this.props.history)
		.then(() => {
				if (this.state.errors.length === 0 || Object.keys(this.state.errors).length === 0) {
					this.props.closeModal();
				}
			});
	}

	renderErrors() {
		if (this.state.errors.text) {
			return (
				<ul>
					{this.state.errors.text.map((error, i) => (
						<li key={`error-${i}`}>{error}</li>
					))}
				</ul>
			);
		} else {
			return (
				""
			);
		}
	}

	render() {
		return (
			<div className="add-account-form-comp">
				<form onSubmit={this.handleNewAccount}>
					<div className="add-account-form">
						<h1>Create Account Form</h1>
						<p>Custodian</p>
						<input
							value={this.state.custodian}
							onChange={this.handleUpdate('custodian')}
							placeholder="e.g. Fidelity, Vanguard, Schwab"
						/>
						<p>Account Type</p>
						<input
							value={this.state.type}
							onChange={this.handleUpdate('type')}
							placeholder="401k, IRA, Roth IRA"
						/>
						<p>Last 4 of Account #</p>
						<input
							value={this.state.last4}
							onChange={this.handleUpdate('last4')}
							placeholder="1234"
						/>
						<br></br>
						<input className="submit" type="submit"/>
					<span className='form-errors'>{this.renderErrors()}</span>
					</div>
				</form>
			</div>
		)
	}
}