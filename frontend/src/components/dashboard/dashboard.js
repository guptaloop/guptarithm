import React from 'react';
import Accounts from './accounts/accounts_container';
import Algo from './algo/algo';
// import { LoadingBar } from './loading_bar';
import AllocChart from './chart/chart';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getPrices = this.getPrices.bind(this);
	}
	
	UNSAFE_componentWillMount() {
		this.props.fetchAccounts(this.props.user.id)
			.then( () => this.getPrices() );
	}

	getPrices() {
		const props = this.props;
		const symbols = [];
		// add user's whitelist funds
		symbols.push('IVV', 'VXUS');

		// loop through accounts and holdings to get all symbols owned
		(this.props.accounts).forEach(account => {
			(account.holdings).forEach(holding => {
				if (symbols.includes(holding.symbol)) {
					return;
				} else {
					symbols.push(holding.symbol);
				}
			});
		});
		// price reducer => POJO with symbol: price as key: val
		symbols.forEach(symbol => {
			props.fetchPrice(symbol);
		});
	}

	render() {
		const prices = this.props.prices;
		const accounts = this.props.accounts;
		
		const displayDash = accounts === undefined || accounts.length === 0 ? (
			<div className="greeting">
				<button onClick={() =>
					this.props.openAccountModal('addAccount')}>+ Add Account</button>
			</div>
		) : (
			<>
			<div className="dashboard">
				<Accounts accounts={accounts} />
				<div className="dash-right">
					<AllocChart prices={prices} accounts={accounts}/>
					<Algo prices={prices} accounts={accounts}/>
				</div>
			</div>
			</>
		);

		return (
			<>{displayDash}</>
		)
	}
}