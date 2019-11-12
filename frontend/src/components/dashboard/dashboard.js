import React from 'react';
import Accounts from './accounts/accounts_container';
import Algo from './algo/algo';
import { LoadingBar } from './loading_bar';
import AllocChart from './chart/chart';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getPrices = this.getPrices.bind(this);
	}
	
	componentWillMount() {
		this.props.fetchAccounts(this.props.user.id)
			.then( () => this.getPrices() );
	}

	getPrices() {
		const props = this.props;
		const symbols = [];
		// add user's whitelist funds
		symbols.push('IVV', 'VXUS');

		// loop through accounts and holdings to get all symbols owned
		(this.props.accounts).forEach(function(account) {
			(account.holdings).forEach(function(holding) {
				if (symbols.includes(holding.symbol)) {
					return;
				} else {
					symbols.push(holding.symbol);
				}
			});
		});
		
		// price reducer => POJO with symbol: price as key: val
		symbols.forEach(function(symbol) {
			props.fetchPrice(symbol.toLowerCase());
		});
	}

	render() {
		const prices = this.props.prices;
		
		const displayDash = 
			// prices === undefined ? <LoadingBar/> : (
				<>
					<div className="dashboard">
						<Accounts accounts={this.props.accounts}/>
						<div className="dash-right">
							{/* <AllocChart prices={prices}/> */}
							<Algo prices={prices}/>
						</div>
					</div>
				</>
		// );

		return (
			<>{displayDash}</>
		)
	}
}