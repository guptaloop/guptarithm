import React from 'react';
import Accounts from './accounts/accounts_container';
import {uniqSymbols} from '../../util/holding_util'
import Algo from './algo/algo';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getPrices = this.getPrices.bind(this);
	}
	
	componentWillMount() {
		this.props.fetchAccounts(this.props.user.id);
		this.props.fetchHoldings(this.props.user.id);
		// .then( () => this.getPrices() );
		// this.props.fetchPrice("VFFVX");
	}

	getPrices() {
		const props = this.props;
		const symbols = uniqSymbols(this.props.holdings);
		symbols.forEach(function(symbol) {
			props.fetchPrice(symbol);
		});
	}

	render() {
		return (
			<div className="dashboard">
				<Accounts />
				{/* replace div below with components */}
				<div className="placeholder">
					<p>CHARTS</p>
					<Algo />
				</div>
			</div>
		)
	}
}
