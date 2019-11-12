import React from 'react';
import HoldingsContainer from './holdings/holdings_container';
import { getAccountValue } from '../../../util/account_util';

class Accounts extends React.Component {
	constructor(props) {
		super(props);
		this.state = { };
	}

	getPortValue(accounts, prices) {
		let portValue = 0;
		accounts.forEach(account => {
			portValue += getAccountValue(account, prices);
			// console.log(accountValue);
		});
		return portValue.toLocaleString();
	}

	renderAccounts() {
		if (this.props.accounts.length > 0) {
			return (
				<ul>
					{(this.props.accounts).map(account => (
						<>
							<li key={account._id} className="account">
								<div>
									<h1>{account.custodian} {account.type} - *{account.last4}</h1>
									<h2>${(getAccountValue(account, this.props.prices)).toLocaleString()}</h2>
								</div>
								<div>
									<h3>Symbol</h3>
									<h3>Shares</h3>
									<h3>Price</h3>
									<h3>Value</h3>
								</div>
							</li>
							<HoldingsContainer holdings={account.holdings} />
							<button onClick={() =>
								this.props.openHoldingModal(account._id)}
								className="add-holding-btn"
							>+ Add Holding</button>
						</>
					))}
				</ul>
			)
		} else {
			return null;
		}
	}

	render() {
		if (this.props.accounts.length > 0) {
			return (
				<div className="accounts-comp">
					<span>
						<h1 className="header">
							Retirement Portfolio - ${this.getPortValue(this.props.accounts, this.props.prices)}
						</h1>
						<button onClick={() =>
							this.props.openAccountModal('addAccount')}>+ Add Account</button>
					</span>
					<div>{this.renderAccounts()}</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

export default Accounts;