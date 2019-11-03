import React, { Component } from 'react';
import * as algoAPI from '../../../util/algo_util';

export default class Algo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	// componentWillMount() {

	// }

	render() {
		const holdings = this.props.holdings;
		const prices = this.props.prices;
		// const display = !prices || !holdings ? null : (
		// 	<>
		// 		{algoAPI.getPortfolioValue(prices, holdings)}
		// 	</>
		// );
		return (
			<div>{algoAPI.getPortfolioValue(holdings, prices)}</div>
		);
	}
}
