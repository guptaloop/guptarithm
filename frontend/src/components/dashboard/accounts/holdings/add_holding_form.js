import React, { Component } from 'react';

export default class AddHoldingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 symbol: "", shares: "", name: "", type: "", expRatio: "",
			 usStocks: "", forStocks: "", eM: "", smallCap: "",
			 bonds: "", indStocks: "", other: "",
			 formState: 0
		};
		this.handleNewAsset = this.handleNewAsset.bind(this);
		this.handleNewHolding = this.handleNewHolding.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}
	
	handleUpdate(field) {
		return e => this.setState({ [field]: e.currentTarget.value });
	}

	handleNewAsset(e) {
		e.preventDefault();
	}

	handleNewHolding(e) {
		e.preventDefault();
	}
	
	handleSearch(e) {
		e.preventDefault();
		
		this.props.fetchAsset(this.state.symbol)
			.then(res => {
				res = this.props.assets[this.state.symbol];
				// if asset exists in db, then user only enters share qty
				if (res) {
					this.setState({ formState: 1 });
				// else they will need to manually enter all asset info
				} else {
					this.setState({ formState: 2 });
				}
			});
	}

	render() {
		let holdingOrAssetForm;
		switch (this.state.formState) {
			case 0:
				holdingOrAssetForm = (
					<div className="asset-search-comp">
						<form onSubmit={this.handleSearch}>
							<div className="asset-search">
								<h1>Which asset do you own?</h1>
								<input
									value={this.state.symbol}
									onChange={this.handleUpdate('symbol')}
									placeholder="Enter Symbol"
								/>
								<input className="submit" type="submit" />
							</div>
						</form>
					</div>
				)
				break;
			case 1:
				holdingOrAssetForm = (
					<div className="asset-search-comp">
						<form onSubmit={this.handleNewHolding}>
							<div className="asset-search">
								<h1>How many shares of VTSAX do you own?</h1>
								<input
									value={this.state.shares}
									onChange={this.handleUpdate('shares')}
									placeholder="Enter Shares"
								/>
								<input className="submit" type="submit" />
							</div>
						</form>
					</div>
				)
				break;
			case 2:
				holdingOrAssetForm = (
				<div className="add-holding-form-comp">
					{/* <form onSubmit={}> */}
					<form>
						<div className="add-holding-form">
							<h1>Create Holding Form</h1>
							<div className="form-inputs">
								<div className="asset-holding">
									<h2>Asset Info</h2>
									<div>
										<p>Symbol</p>
										<input
											value={this.state.symbol}
											onChange={this.handleUpdate('symbol')}
											placeholder="MSFT"
										/>
									</div>
									<div>
										<p>Shares</p>
										<input
											value={this.state.shares}
											onChange={this.handleUpdate('shares')}
											placeholder="48"
										/>
									</div>
									<div>
										<p>Name</p>
										<input
											value={this.state.name}
											onChange={this.handleUpdate('name')}
											placeholder="Vanguard Stock Fund"
										/>
									</div>
									<div>
										<p>Type</p>
										<select onChange={this.handleUpdate('type')}>
											<option value="0">-- select --</option>
											<option value="Stock">Stock</option>
											<option value="ETF">ETF</option>
											<option value="Mutual Fund">Mutual Fund</option>
											<option value="Other">Other</option>
										</select>
									</div>
									<div>
										<p>Expense Ratio</p>
										<input
											value={this.state.expRatio}
											onChange={this.handleUpdate('expRatio')}
											placeholder="enter decimal (not %)"
										/>
									</div>
								</div>
								<div className="asset-allocation">
									<h2>Asset Allocation</h2>
									<div>
										<p>Individual Stocks</p>
										<input
											value={this.state.indStocks}
											onChange={this.handleUpdate('indStocks')}
											placeholder="100"
										/>
									</div>
									<div>
										<p>US Stocks</p>
										<input
											value={this.state.usStocks}
											onChange={this.handleUpdate('usStocks')}
											placeholder="0"
										/>
									</div>
									<div>
										<p>Foreign Stocks</p>
										<input
											value={this.state.forStocks}
											onChange={this.handleUpdate('forStocks')}
											placeholder="0"
										/>
									</div>
									<div>
										<p>Emerging Markets</p>
										<input
											value={this.state.eM}
											onChange={this.handleUpdate('eM')}
											placeholder="0"
										/>
									</div>
									<div>
										<p>Small Cap (US)</p>
										<input
											value={this.state.smallCap}
											onChange={this.handleUpdate('smallCap')}
											placeholder="0"
										/>
									</div>
									<div>
										<p>Bonds</p>
										<input
											value={this.state.bonds}
											onChange={this.handleUpdate('bonds')}
											placeholder="0"
										/>
									</div>
									<div>
										<p>Other</p>
										<input
											value={this.state.other}
											onChange={this.handleUpdate('other')}
											placeholder="0"
										/>
									</div>
								</div>
							</div>
							<input className="submit" type="submit" />
						</div>
					</form>
				</div>)
				break;
			default:
				holdingOrAssetForm = (
					<h1>Something went wrong, please reload your page</h1> )
					break;
		}

		return (
			<>
				{holdingOrAssetForm}
			</>
		)
	}
}