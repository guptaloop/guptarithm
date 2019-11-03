import React, { Component } from 'react';
import * as algoAPI from '../../../util/algo_util';

export default class Algo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		const holdings = this.props.holdings;
		const prices = this.props.prices;
		return (
			<div>{algoAPI.getPortfolioValue(holdings, prices)}</div>
		);
	}
}