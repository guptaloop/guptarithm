import React, { Component } from 'react';
import * as algoAPI from '../../../util/algo_util';

export default class Algo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		const assets = this.props.assets;
		const holdings = this.props.holdings;
		const prices = this.props.prices;
		return (
			<button 
				onClick={() => algoAPI.getPortfolioValue(holdings, prices, assets)} 
			>ALGO</button>
		);
	}
}