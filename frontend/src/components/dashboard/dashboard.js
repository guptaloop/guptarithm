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
		// add my whitelist funds
		symbols.push('IVV', 'VXUS');
		// fill up the prices slice of state
		symbols.forEach(function(symbol) {
			props.fetchPrice(symbol.toLowerCase());
		});
	}

	render() {
		const assets = this.props.assets;
		const prices = this.props.prices;
		// const fakeprices = {
		// 	"VFFVX": "50", "AAPL": "250", "MSFT": "100", "AMZN": "1200", 
		// 	"IVV": "135", "VXUS": "88" };

		const displayDash = 
			prices === undefined ? <LoadingBar/> : (
				<>
					<div className="dashboard">
						<Accounts />
						<div className="dash-right">
							{/* <AllocChart assets={assets} prices={prices}/> */}
							<Algo assets={assets} prices={prices}/>
						</div>
					</div>
				</>
		);

		return (
			<>{displayDash}</>
		)
	}
}