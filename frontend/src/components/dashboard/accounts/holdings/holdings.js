import React, { Component } from 'react';

export default class Holdings extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderHoldings() {
		// holdings & prices props are passed in from the Accounts component
		if (this.props.holdings.length > 0) {
			const holdings = this.props.holdings;
			const prices = this.props.prices;
			return (
				<ul>
					{holdings.map(holding => {
						const price = prices[holding.symbol];
						const value = Math.round(price * holding.shares).toLocaleString();
						return (
							<li key={holding._id} className="holding">
								<div>
									<h2>{holding.symbol}</h2>
									<h2>{holding.shares}</h2>
									<h2>${parseFloat(price).toFixed(2)}</h2>
									<h2>${value}</h2>
								</div>
							</li>
						)
					})}
				</ul>
			)
		} else {
			return null;
		}
	}

	render() {
		return (
			<div>
				{this.renderHoldings()}
			</div>
		)
	}
}