import React, { Component } from 'react';

export default class AddHoldingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 symbol: "", shares: "", name: "", type: "", expRatio: "",
			 usStocks: "", forStocks: "", eM: "", smallCap: "",
			 bonds: "", indStocks: "", other: "",
		};
		this.handleNewAsset = this.handleNewAsset.bind(this);
		this.handleNewHolding = this.handleNewHolding.bind(this);
	}
	
	handleUpdate(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleNewAsset(e) {
		e.preventDefault();
	}

	handleNewHolding(e) {
		e.preventDefault();
	}


	render() {
		return (
			<div className="add-holding-form-comp">
				{/* <form onSubmit={}> */}
				<form>
					<div className="add-holding-form">
						<h1>Create Holding Form</h1>
						<p>Symbol</p>
						<input
							value={this.state.symbol}
							onChange={this.handleUpdate('symbol')}
							placeholder="e.g. MSFT, IVV, VTSAX"
						/>
						<p>Shares</p>
						<input
							value={this.state.shares}
							onChange={this.handleUpdate('shares')}
							placeholder="enter a number"
						/>
						<p>Name</p>
						<input
							value={this.state.name}
							onChange={this.handleUpdate('name')}
							placeholder="e.g. Microsoft, Vanguard Total Stock Fund"
						/>
						<p>Type</p>
						<input
							value={this.state.type}
							onChange={this.handleUpdate('type')}
							placeholder="e.g. Stock, ETF, Mutual Fund, Other"
						/>
						<p>Expense Ratio</p>
						<input
							value={this.state.expRatio}
							onChange={this.handleUpdate('expRatio')}
							placeholder="enter as decimal (not %)"
						/>
						<p>Domestic (US) Stocks</p>
						<input
							value={this.state.usStocks}
							onChange={this.handleUpdate('usStocks')}
							placeholder="enter a number between 0-100"
						/>
						<p>Foreign Stocks</p>
						<input
							value={this.state.forStocks}
							onChange={this.handleUpdate('forStocks')}
							placeholder="enter a number between 0-100"
						/>
						<p>Emerging Markets</p>
						<input
							value={this.state.eM}
							onChange={this.handleUpdate('eM')}
							placeholder="enter a number between 0-100"
						/>
						<p>Small Cap (US)</p>
						<input
							value={this.state.smallCap}
							onChange={this.handleUpdate('smallCap')}
							placeholder="enter a number between 0-100"
						/>
						<p>Individual Stocks</p>
						<input
							value={this.state.indStocks}
							onChange={this.handleUpdate('indStocks')}
							placeholder="enter a number between 0-100"
						/>
						<p>Bonds / Fixed Income</p>
						<input
							value={this.state.bonds}
							onChange={this.handleUpdate('bonds')}
							placeholder="enter a number between 0-100"
						/>
						<p>Other</p>
						<input
							value={this.state.other}
							onChange={this.handleUpdate('other')}
							placeholder="enter a number between 0-100"
						/>
						
						<br></br>
						<input className="submit" type="submit" />
					</div>
				</form>
			</div>
		)
	}
}