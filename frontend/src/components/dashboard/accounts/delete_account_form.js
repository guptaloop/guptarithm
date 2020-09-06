import React, { Component } from 'react';

export default class DeleteAccountForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
	}

	handleDeleteAccount(e) {
		e.preventDefault();

		this.props.deleteAccount(
			this.props.accountId, this.props.user.id, this.props.history
		)
		.then(() => {
			this.props.closeModal();
		})
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
			<div className="delete-account-div">
				<h2>Are you sure you want to delete this account?</h2>
				<div className="delete-buttons">
					<button 
						onClick={() => this.props.closeModal()}
						>Keep Account
					</button>
					<button 
						onClick={this.handleDeleteAccount}
						>Delete Account
					</button>
				</div>
				{/* <span className='form-errors'>{this.renderErrors()}</span> */}
			</div>
		)
	}
}