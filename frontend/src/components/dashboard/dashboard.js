import React from 'react';
import Accounts from './accounts/accounts_container';
import {uniqSymbols} from '../../util/holding_util'
import Algo from './algo/algo';
import {LoadingBar} from './loading_bar';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getPrices = this.getPrices.bind(this);
	}
	
	componentWillMount() {
		this.props.fetchAccounts(this.props.user.id);
		this.props.fetchHoldings(this.props.user.id)
		// this.props.fetchPrice("VFFVX");
			.then( () => this.getPrices() );
	}

	getPrices() {
		const props = this.props;
		const symbols = uniqSymbols(this.props.holdings);
		symbols.forEach(function(symbol) {
			// props.fetchPrice(symbol);
			props.fetchAsset(symbol);
		});
	}

	render() {
		// const accounts = this.props.accounts;
		const assets = this.props.assets;
		const holdings = this.props.holdings;
		// const prices = this.props.prices;
		const fakeprices = {
			"VFFVX": "50", "AAPL": "250", "MSFT": "100", "AMZN": "1200"
		};

		const displayDash = 
			fakeprices === undefined || holdings === undefined ? <LoadingBar/> : (
				<>
					<div className="dashboard">
						<Accounts />
						<div className="placeholder">
							<p>CHARTS</p>
							<Algo holdings={holdings} assets={assets} prices={fakeprices}/>
						</div>
					</div>
				</>
		);

		return (
			<>{displayDash}</>
		)
	}
}
