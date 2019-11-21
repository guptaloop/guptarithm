import React, { Component } from 'react';
import * as algoAPI from '../../../util/algo_util';
import {quotes} from './quotes';

export default class Algo extends Component {
	constructor(props) {
		super(props);
		this.state = {'orders': "" };
		this.runAlgo = this.runAlgo.bind(this);
	}
	
	runAlgo(accounts, prices) {
		let holdings = [];
		accounts.forEach(account => {
			(account.holdings).forEach(holding => {
				holdings.push(holding);
			});
		});
		const orders = algoAPI.getPortfolioValue(holdings, prices);
		this.setState({ 'orders': orders });
	}

	render() {
		const accounts = this.props.accounts;
		const prices = this.props.prices;
		const orders = this.state.orders;
		const idx = Math.floor(Math.random() * quotes.length);

		let displayOrders;
		switch(orders) {
			case "":
			displayOrders = (
				<div className="run-algo-modal">
					<p>"{quotes[idx][0]}"</p>
					<h3>– {quotes[idx][1]}</h3>
					<button onClick={() => this.runAlgo(accounts, prices)}>
						Run Guptarithm
					</button>
				</div>
			)
			break;
			// case {}: // no trades needed, portfolio is balanced
			// displayOrders = ()
			// break;
			default:
				let sell = orders.sell;
				let buy = orders.buy;
				let sellSymbols = Object.keys(sell);
				let buySymbols = Object.keys(buy);
				displayOrders = (
					<ul className="orders-modal">
						<h1>Rebalance Trade Recommendations</h1>
						<div className="orders">
							<div>
							<h2>Sell Orders</h2>
								{sellSymbols.map(symbol => (
									<li key={symbol}>
										{`sell ${sell[symbol]} shares of ${symbol}`}			
									</li>
								))}
							</div>
							<div>
								<h2>Buy Orders</h2>
								{buySymbols.map(symbol => (
									<li key={symbol}>
										{`buy ${buy[symbol]} shares of ${symbol}`}			
									</li>
								))}
							</div>
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