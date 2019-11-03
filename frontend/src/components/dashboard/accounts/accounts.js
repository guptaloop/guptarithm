import React from 'react';
import HoldingsContainer from './holdings/holdings_container';

class Accounts extends React.Component {
	constructor(props) {
		super(props);
		this.state = { accounts: [] };
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
									<h2>$400,000</h2>
								</div>
								<div>
									<h3>Symbol</h3>
									<h3>Shares</h3>
									<h3>Price</h3>
									<h3>Value</h3>
								</div>
							</li>
							<HoldingsContainer account={account._id} />
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
		return (
			<div className="accounts-comp">
				<span>
					<h1 className="header">Retirement Portfolio - $71,430</h1>
					<button onClick={() =>
						this.props.openAccountModal('addAccount')}>+ Add Account</button>
				</span>
				<div>{this.renderAccounts()}</div>
			</div>
		)
	}
}

export default Accounts;