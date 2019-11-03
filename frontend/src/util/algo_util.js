
export const getPortfolioValue = (holdings, prices, assets) => {
	let portValue = 0;
	if (holdings === undefined) {
		return null;
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
		portValue, holdings, prices);
};

const getHoldingPercentages = (portValue, holdings, prices) => {
	for (let i = 0; i < holdings.length; i++) {
		let holding = holdings[i];
		let sym = holding.symbol;
		let price = prices[sym];
		let shares = holding.shares;
			holding.pct = (price * shares) / portValue;
	}
	return compareAllocations(portValue, holdings, prices);
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