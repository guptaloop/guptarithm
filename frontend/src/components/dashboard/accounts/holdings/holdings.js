import React, { Component } from 'react';

export default class Holdings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 holdings: [],
			 prices: {},
		};
	}	

	renderHoldings() {
		return (
			<ul>
				{(this.props.holdings).map(holding => {
					if (holding.account === this.props.account) {
						return (
							<li key={holding._id} className="holding">
								<div>
									<h2>{holding.symbol}</h2>
									<h2>{holding.shares}</h2>
									<h2>$50.85</h2>
									<h2>$100</h2>
								</div>
							</li>
						)
					} else {
						return null;
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
