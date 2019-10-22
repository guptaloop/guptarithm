import React, { Component } from 'react';

export default class Holdings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 holdings: [],
			 price: {},
		};
		this.fetchHoldings = this.fetchHoldings.bind(this);
		this.fetchPrice = this.fetchPrice.bind(this);
	}
	
	componentDidMount() {
		this.fetchHoldings();
		// this.fetchPrice();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ holdings: nextProps.holdings });
	}

	fetchHoldings() {
		this.props.fetchHoldings(this.props.user.id)
			.then(() => this.setState({ holdings: this.props.holdings }));
		}
		
	fetchPrice() {
		this.props.fetchPrice();
	}

	renderHoldings() {
		// takes in the account id as a prop from Accounts and checks if it matches the account id attached to the holding
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
