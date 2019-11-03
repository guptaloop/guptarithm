import React, { Component } from 'react';
import * as algoAPI from '../../../util/algo_util';

export default class Algo extends Component {
	constructor(props) {
		super(props);
		this.state = {'orders': "" };
		this.runAlgo = this.runAlgo.bind(this);
	}
	
	runAlgo(holdings, prices, assets) {
		const orders = algoAPI.getPortfolioValue(holdings, prices, assets);
		this.setState({ 'orders': orders });
	}

	render() {
		const assets = this.props.assets;
		const holdings = this.props.holdings;
		const prices = this.props.prices;
		const orders = this.state.orders;

		let displayOrders;
		switch(orders) {
			case "":
			displayOrders = (
				<button className="algo-btn"
					onClick={() => this.runAlgo(holdings, prices, assets)}
				>ALGO</button>
			)
			break;
			default:
				let sell = orders.sell;
				let buy = orders.buy;
				let sellSymbols = Object.keys(sell);
				let buySymbols = Object.keys(buy);
				displayOrders = (
					<ul className="algo-orders">
						<div>
						<h1>Sell Orders</h1>
							{sellSymbols.map(symbol => (
								<li key={symbol}>
									{`sell ${sell[symbol]} shares of ${symbol}`}			
								</li>
							))}
						</div>
						<div>
							<h1>Buy Orders</h1>
							{buySymbols.map(symbol => (
								<li key={symbol}>
									{`buy ${buy[symbol]} shares of ${symbol}`}			
								</li>
							))}
						</div>
					</ul>
				);
				break;
		};

		return (
			<>{displayOrders}</>	
		);
	}
}