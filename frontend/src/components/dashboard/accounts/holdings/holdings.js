import React, { Component } from 'react';

export default class Holdings extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderHoldings() {
		if (this.props.holdings.length > 0) {
			return (
				<ul>
					{(this.props.holdings).map(holding => {
						const price = this.props.prices[holding.symbol];
						const value = Math.round(price * holding.shares).toLocaleString();
						return (
							<li className="holding">
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
		// console.log(this.props.holdings);
		return (
			<div>
				{this.renderHoldings()}
			</div>
		)
	}
}