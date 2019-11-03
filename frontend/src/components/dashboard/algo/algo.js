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
				<button 
					onClick={() => this.runAlgo(holdings, prices, assets)}
				>ALGO</button>
			)
			break;
			default:
				let sell = orders.sell;
				let buy = orders.buy;
				let sellSymbols = Object.keys(sell);
				let buySymbols = Object.keys(buy);
				// console.log(sells, buys);
				displayOrders = (
					<ul>
						<span>
							{sellSymbols.map(symbol => (
								<li key={symbol}>
									{`Sell ${sell[symbol]} shares of ${symbol}`}			
								</li>
							))}
						</span>
						<span>
							{buySymbols.map(symbol => (
								<li key={symbol}>
									{`Buy ${buy[symbol]} shares of ${symbol}`}			
								</li>
							))}
						</span>
					</ul>
				);
				break;
		};

		return (
			<>{displayOrders}</>	
		);
	}
}