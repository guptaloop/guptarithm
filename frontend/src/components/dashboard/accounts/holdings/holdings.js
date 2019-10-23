import React, { Component } from 'react';

export default class Holdings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 holdings: [],
			 prices: {},
		};
		this.fetchHoldings = this.fetchHoldings.bind(this);
		// this.fetchPrices = this.fetchPrices.bind(this);
	}
	
	componentDidMount() {
		this.fetchHoldings();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.holdings.length !== this.state.holdings.length) {
			this.setState({ holdings: nextProps.holdings });
		}
		// let symbols = [];
		// nextProps.holdings.forEach(holding => {
		// 	const symbol = holding.symbol;
		// 	if (this.props.prices[symbol] === undefined) {
		// 		if (!symbols.includes(symbol)) {
		// 			this.props.fetchPrice(symbol)
		// 				.then(() => symbols.push(symbol));
		// 		}
		// 	}
		// });
	}

	fetchHoldings() {
		this.props.fetchHoldings(this.props.user.id)
			.then(() => this.setState({ holdings: this.props.holdings }));
	}
		
	// fetchPrices() {
	// }

	renderHoldings() {
		// takes in the account id as a prop from Accounts and checks if it matches the account id attached to the holding
		const prices = {};
		if (this.state.holdings.length > 0) {
			this.state.holdings.map(holding => {
				if (!prices[holding.symbol]) {
					prices[holding.symbol] = "$100";
				}
			});
			// if (symbols.includes())
		}
		console.log(prices);

		return (
			<ul>
				{(this.state.holdings).map(holding => {
					if (holding.account === this.props.account) {
						return (
							<>
							<li key={holding._id} className="holding">
								<div>
									<h2>{holding.symbol}</h2>
									<h2>{holding.shares}</h2>
									<h2>$50.85</h2>
									<h2>$100</h2>
								</div>
							</li>
							</>
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
