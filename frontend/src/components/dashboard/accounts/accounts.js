import React from 'react';
import Holdings from './holdings/holdings';
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
		});
		return portValue.toLocaleString();
	}

	renderAccounts() {
		if (this.props.accounts.length > 0) {
			const prices = this.props.prices;
			return (
				<ul>
					{(this.props.accounts).map(account => (
						<div key={account._id}>
							<li className="account">
								<div>
									<h1>
										{account.custodian} {account.type} - *{account.last4}
									</h1>
									<h2>
										${(getAccountValue(account, prices)).toLocaleString()}
									</h2>
								</div>
								<div>
									<h3>Symbol</h3>
									<h3>Shares</h3>
									<h3>Price</h3>
									<h3>Value</h3>
								</div>
							</li>
							<Holdings holdings={account.holdings} prices={prices} 	fetchPrice={this.props.fetchPrice} />
							<button className="add-holding-btn"
								onClick={() => this.props.openHoldingModal(account._id)}
							>+ Add Holding</button>
						</div>
					))}
				</ul>
			)
		} else {
			return null;
		}
	}

	render() {
		if (this.props.accounts.length > 0) {
			const accounts = this.props.accounts;
			const prices = this.props.prices;
			return (
				<div className="accounts-comp">
					<span>
						<div className="header">
							<h1>Retirement Portfolio</h1>
							<h2>${this.getPortValue(accounts, prices)}</h2>
						</div>
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