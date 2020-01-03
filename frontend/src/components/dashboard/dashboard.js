import React from 'react';
import Accounts from './accounts/accounts_container';
import AllocChart from './asset_allocation/chart';
import Footer from '../footer/footer';

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
		symbols.push('IVV', 'VEA');

		// loop through accounts and holdings to get all symbols owned
		(this.props.accounts).forEach(account => {
			(account.holdings).forEach(holding => {
				if (!symbols.includes(holding.symbol)) {
					symbols.push(holding.symbol);
				}
			});
		});
		// logic for 1 api call per symbol. 
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
					<Footer />
				</div>
			</div>
			</>
		);

		return (
			<>{displayDash}</>
		)
	}
}