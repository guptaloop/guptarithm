import React from 'react';

class Accounts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accountName: '',	accounts: []
		};
		// this.handleNewAccount = this.handleNewAccount.bind(this);
		this.fetchAccounts = this.fetchAccounts.bind(this);
	}

	componentDidMount() {
		this.fetchAccounts();
	}

	fetchAccounts() {
		this.props.fetchAccounts(this.props.user.id)
			.then(() => this.setState({ accounts: this.props.accounts }));
	}

	// handleUpdate(field) {
	// 	return e => this.setState({
	// 		[field]: e.currentTarget.value
	// 	});
	// }

	// handleNewAccount(e) {
	// 	e.preventDefault();
	// 	let account = { 
	// 		name: this.state.accountName,
	// 		userId: this.props.user.id
	// 	};
	// 	this.props.createAccount(account)
	// 		.then(() => {	this.fetchAccounts();	});
	// }

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
				<button onClick={() => this.props.openAccountModal('addAccount')}>
					+ Add Account
				</button>
				<div>{this.renderAccounts()}</div>
			</>
		)
	}
}

export default Accounts;


// Add Account
//  button link that says "+ Add Account"
//  when clicked, it turns into an input field for the account name, with a button "Submit",
// 		-- dispatches the create account, and re-renders the component with the new account (no holdings)
// 		-- turns the input field & submit back to "+ Add Account"

// // Account View
// 	account name - account value
// 	button to add holding (brings up a modal if the asset DNE)
// 		-- if asset exists, just toggle to an input field for shares
// 		-- otherwise, open a modal with a form to fill in all info
// columns to display in the accounts table
// symbol, name, type,