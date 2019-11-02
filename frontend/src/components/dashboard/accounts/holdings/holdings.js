import React, { Component } from 'react';

export default class Holdings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 holdings: [],
			//  prices: {'IVV': '12', 'VUG': '18' },
		};
	}

	renderHoldings() {
		if (this.props.holdings.length > 0) {

			return (
				<ul>
					{(this.props.holdings).map(holding => {
						if (holding.account === this.props.account) {
							return (
								<li className="holding">
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