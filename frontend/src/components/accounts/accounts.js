import React from 'react';

class Accounts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accoune: '',	accounts: []
		};
		this.handleNewAccount = this.handleNewAccount.bind(this);
		this.fetchAccounts = this.fetchAccounts.bind(this);
	}

	componentDidMount() {
		this.fetchAccounts();
	}

	fetchAccounts() {
		this.props.fetchAccounts(this.props.userId)
			.then(() => this.setState({ accounts: this.props.accounts }));
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
		this.props.createAccount(account)
			.then(() => {	this.fetchAccounts();	});
	}

	renderAccounts() {
		return (
			<ul>
				{(this.state.accounts).map(account => (
					<li key={account._id}>{(account.name)}
						{/* <button onClick={this.props.deleteAccount}>
							DELETE
						</button> */}
					</li>
				))}
			</ul>
		)
	}

	render() {
		return (
			<>
				<form onSubmit={this.handleNewAccount}>Create New Account
					<input
						value={this.state.accountName}
						onChange={this.handleUpdate('accountName')}
						placeholder="Enter account name (don't use full account #)"
					/>
				</form>
				<div>{this.renderAccounts()}</div>
			</>
		)
	}
}

export default Accounts;