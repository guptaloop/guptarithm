import React, { Component } from 'react';

export default class Holdings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 holdings: [],
		};
		this.fetchHoldings = this.fetchHoldings.bind(this);
	}
	
	componentDidMount() {
		this.fetchHoldings();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ holdings: nextProps.holdings });
	}

	fetchHoldings() {
		this.props.fetchHoldings(this.props.user.id)
			.then(() => this.setState({ holdings: this.props.holdings }));
	}

	renderHoldings() {
		// takes in the account id as a prop from Accounts and checks if it matches the account id attached to the holding
		return (
			<ul>
				{(this.state.holdings).map(holding => {
					if (holding.account === this.props.account) {
						return (
							<>
							<li key={holding._id} className="account">
								<div>{holding.symbol} {holding.account} - {holding.shares}</div>
								<div>$(holdingValue)</div>
							</li>
							</>
						)
					}
				})}
			</ul>
		)
	}

	render() {
		return (
			<div>
				{this.renderHoldings()}
			</div>
		)
	}
}
