import React from 'react';
import HoldingsContainer from './holdings/holdings_container';

class Accounts extends React.Component {
	constructor(props) {
		super(props);
		this.state = { accounts: [] };
		this.fetchAccounts = this.fetchAccounts.bind(this);
	}

	componentDidMount() {
		this.fetchAccounts();
	}

	componentDidUpdate() {
		const accounts = this.props.accounts;
		if (accounts !== {} && accounts.length !== this.state.accounts.length) {
			this.fetchAccounts(); 
		}
	}

	fetchAccounts() {
		this.props.fetchAccounts(this.props.user.id)
			.then(() => this.setState({ accounts: this.props.accounts }));
	}

	renderAccounts() {
		return (
			<ul>
				{(this.state.accounts).map(account => (
					<>
						<li key={account._id} className="account">
							<div>
								<h1>{account.custodian} {account.type} - *{account.last4}</h1>
								<h2>$400,000</h2>
							</div>
							<div>
								<h3>Symbol</h3>
								<h3>Shares</h3>
								<h3>Price</h3>
								<h3>Value</h3>
							</div>
						</li>
						<HoldingsContainer account={account._id}/>
						<button onClick={() => 
								this.props.openHoldingModal(account._id)}
								className="add-holding-btn"
							>+ Add Holding</button>
					</>
				))}
			</ul>
		)
	}

	render() {
		return (
			<div className="accounts-comp">
				<span>
					<h1>Retirement Portfolio - $71,430</h1>
					<button onClick={() =>
						this.props.openAccountModal('addAccount')}>+ Add Account</button>
				</span>
				<div>{this.renderAccounts()}</div>
			</div>
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