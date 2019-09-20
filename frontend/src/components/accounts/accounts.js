import React from 'react';

class Accounts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accountName: '',
			errors: {},

		};
		this.handleNewAccount = this.handleNewAccount.bind(this);
		this.fetchAccounts = this.fetchAccounts.bind(this);
	}

	componentDidMount() {
		this.fetchAccounts();
	}
	
	// componentWillReceiveProps(nextProps) {
	// 	this.setState({ errors: nextProps.errors });
	// }

	fetchAccounts() {
		this.props.fetchAccounts(this.props.userId);
	}

	handleUpdate(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleNewAccount(e) {
		e.preventDefault();
		let account = { 
			name: this.state.accountName,
			userId: this.props.userId
		};
		// console.log(account);
		this.props.createAccount(account)
			.then(() => {
				// if (this.props.errors.length === 0) {	 }
				this.fetchAccounts();
			});
	}


	render() {
		return (
			<div>
				<form onSubmit={this.handleNewAccount}>Create New Account
					<input
						value={this.state.accountName}
						onChange={this.handleUpdate('accountName')}
						placeholder="Enter account name (don't use full account #)"
					/>
				</form>
			</div>
		)
	}
}

export default Accounts;