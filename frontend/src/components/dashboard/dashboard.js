import React from 'react';
import Accounts from './accounts/accounts_container';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prices: {}
		};
	}
	
	componentWillMount() {
		this.props.fetchAccounts(this.props.user.id);
		this.props.fetchHoldings(this.props.user.id);
	}

	render() {
		return (
			<div className="dashboard">
				<Accounts />
				{/* replace div below with components */}
				<div className="placeholder">
					<p>CHARTS</p>
					<p>ALGO</p>
				</div>
			</div>
		)
	}
}
