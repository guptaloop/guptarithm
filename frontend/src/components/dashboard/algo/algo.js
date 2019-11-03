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
		const displayOrders = orders === "" ? (
			<button 
				onClick={() => this.runAlgo(holdings, prices, assets)}
			>ALGO</button>
		) : (
				<ul>
					<li>
						{'poopscoop'}
					</li>
				</ul>
		);

		console.log(orders);
		return (
			<>{displayOrders}</>	
		);
	}
}