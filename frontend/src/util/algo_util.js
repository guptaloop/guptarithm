
export const getPortfolioValue = (holdings, prices, assets, chart=null) => {

	if (chart !== null) {
		// separate logic for generating the chart.
		let newHoldings = prices;
		let newPrices = assets;
		let newAssets = holdings;
		let portValue = 0;
		if (holdings === undefined) {
			return ([{ name: 'Group A', value: 400 }]);
		}
		for (let i = 0; i < newHoldings.length; i++) {
			let holding = newHoldings[i];
			let sym = holding.symbol;
			let price = newPrices[sym];
			let shares = holding.shares;
			portValue = portValue + (price * shares);
			// set price, value and allocation for each holding
			holding.price = parseFloat(price);
			holding.value = price * shares;
			if (newAssets[sym] !== undefined) {
				holding["allocation"] = newAssets[sym]["allocation"];
			}
		}
		return getHoldingPercentages(
			portValue, newHoldings, newPrices, chart);
	} else if (chart === null) {

		let portValue = 0;
		if (holdings === undefined) {
			return ([{ name: 'Group A', value: 400 }]);
		}
		for (let i = 0; i < holdings.length; i++) {
			let holding = holdings[i];
			let sym = holding.symbol;
			let price = prices[sym];
			let shares = holding.shares;
				portValue = portValue + (price * shares);
				// set price, value and allocation for each holding
				holding.price = parseFloat(price);
				holding.value = price * shares;
				holding["allocation"] = assets[holding.symbol]["allocation"];
		}
		return getHoldingPercentages(
			portValue, holdings, prices, chart);
	}
};

const getHoldingPercentages = (portValue, holdings, prices, chart=null) => {
	for (let i = 0; i < holdings.length; i++) {
		let holding= holdings[i];
		let sym = holding.symbol;
		let price = prices[sym];
		let shares = holding.shares;
			holding.pct = (price * shares) / portValue;
	}
	if (chart !== null) {
		return returnChartAllocations(holdings);
	} else if (chart === null) {
		return compareAllocations(portValue, holdings, prices);
	}
};

const returnChartAllocations = (holdings) => {
	const data = [
		{ name: 'usStocks', value: 0.00 }, 
		{ name: 'forStocks', value: 0.00 },
		{ name: 'em', value: 0.00 }, 
		{ name: 'smallCap', value: 0.00 },
		{ name: 'bonds', value: 0.00 },
		{ name: 'indStocks', value: 0.00 },
		{ name: 'other', value: 0.00 }
	];
	
	for(let i = 0; i < holdings.length; i++) {
		let holding = holdings[i];
		if (holding.allocation === undefined) {
			return ([{ name: 'Group A', value: 400 }]);
		} else {
			let categories = Object.keys(holding.allocation);
			
			for (let i = 0; i < categories.length; i++) {
				let category = categories[i];
				let holdingAl = holding.allocation[categories[i]];
				let holdingPct = holding.pct;
				
				switch(category) {
					case ('usStocks'):
						data[0].value += (holdingAl * holdingPct);
						break;
					case ('forStocks'):
						data[1].value += (holdingAl * holdingPct);
						break;
					case ('em'):
						data[2].value += (holdingAl * holdingPct);
						break;
					case ('smallCap'):
						data[3].value += (holdingAl * holdingPct);
						break;
					case ('bonds'):
						data[4].value += (holdingAl * holdingPct);
						break;
					case ('indStocks'):
						data[5].value += (holdingAl * holdingPct);
						break;
					case ('other'):
						data[6].value += (holdingAl * holdingPct);
						break;
					default:
						break;
				}
			}
		}
	}
	return data;
};

const compareAllocations = (portValue, holdings, prices) => {
	let currentAl = {
		usStocks: 0.00,
		forStocks: 0.00,
		em: 0.00,
		smallCap: 0.00,
		bonds: 0.00,
		indStocks: 0.00,
	 	other: 0.00,
	};
	const targetAl = { usStocks: 55, forStocks: 45 };
	const delta = { usStocks: 0, forStocks: 0 };

	// loops through each holding, and determines current portfolio allocation
	for (let i = 0; i < holdings.length; i++) {
		let holding = holdings[i];
		let categories = Object.keys(holding.allocation);

		if (categories.includes('bonds') || categories.includes('other')) {
			currentAl.other += (holding.pct);
			holding['sellAll'] = true;
		} else if (categories.includes('indStocks')) {
			currentAl.indStocks += (holding.pct);
			holding['sellAll'] = true;
		} else {
			for (let i = 0; i < categories.length; i++) {
				let category = categories[i];
					let holdingAl = holding.allocation[categories[i]];
					let holdingPct = holding.pct;
					currentAl[category] += (holdingAl * holdingPct);
				}
			}
		}

	// compares the current to targets, and creates the delta hash
	for (var key in currentAl) {
		if (delta[key] === 0) {
			// don't need to check non-target categories, they will always be sold.
			delta[key] = currentAl[key] - targetAl[key];
		}
	}
		return recOrders(portValue, holdings, prices, delta);
};

const recOrders = (portValue, holdings, prices, delta) => {
	// const whitelist = [
	// 	{ usStocks: { symbol: 'IVV', price: prices['IVV'] } },
	// 	{ forStocks: { symbol: 'VXUS', price: prices['VXUS']  } }
	// ];
	const orders = { 
		"sell": {}, 
		"buy": {"VXUS": 0, "IVV": 0}
	};

	let sellAmount = 0;
	for (let i = 0; i < holdings.length; i++) {
		const holding = holdings[i];
		if (holding.sellAll) {
			sellAmount += (holding.shares * holding.price);
			orders.sell[holding.symbol] = "all";
		}
	}
	
	if (sellAmount === portValue) {
		sellAmount -= 50; // account for commissions
		const vxusBuyAmt = 0.45 * portValue;
		const vxusQty = Math.floor(vxusBuyAmt / prices['VXUS']);
		orders.buy['VXUS'] += vxusQty;
		const ivvBuyAmt = 0.55 * portValue;
		const ivvQty = Math.floor(ivvBuyAmt / prices['IVV']);
		orders.buy['IVV'] += ivvQty;
	} else { // figure out how much of target classes need to be sold
		// for (var key in delta) {
		// 	if ((key === 'usStocks' || 'forStocks') && Math.abs(delta[key]) >= 0.005) {
		// 		if (delta[key] > 0) {
		// 			// recSellAmounts(key, delta[key], whitelist);
		// 		} else if (delta[key] < 0) {
		// 			// recBuyAmounts(key, delta[key], whitelist);
		// 		}
		// 	}
		// }
	}
	return orders;
};