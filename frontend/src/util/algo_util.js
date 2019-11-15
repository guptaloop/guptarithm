
export const getPortfolioValue = (holdings, prices, chart=null) => {

	let portValue = 0;
	// determine portfolio value, and set some attributes for holdings
	holdings.forEach(holding => {
		let shares = holding.shares;
		let symbol = holding.symbol;
		let price = prices[symbol];
			holding.price = parseFloat(price);
			holding.value = price * shares;
			portValue += holding.value;
	});
	// set the holding percentages of the total portfolio value
	holdings.forEach(holding => {
		holding.pct = (holding.value / portValue);
	});
	if (chart !== null) {
		return [portValue, holdings];
	} else {
		return compareAllocations(portValue, holdings, prices);
	}
};

const compareAllocations = (portValue, holdings, prices) => {
	let currentAllocation = {
		usStocks: 0.00,	forStocks: 0.00, eM: 0.00,
		smallCap: 0.00, bonds: 0.00, indStocks: 0.00, other: 0.00
	};
	const targetAllocation = { usStocks: 55, forStocks: 45 };
	const delta = { usStocks: 0, forStocks: 0 };

	// loops through each holding, and determines current portfolio allocation

	holdings.forEach(holding => {
		let categories = Object.keys(holding.asset.allocation);

		if (categories.includes('bonds') || categories.includes('other')) {
			currentAllocation.other += (holding.pct);
			holding['sellAll'] = true;
		} else if (categories.includes('indStocks')) {
			currentAllocation.indStocks += (holding.pct);
			holding['sellAll'] = true;
		} else {
			categories.forEach(cat => {
				let holdingAllocation = holding.asset.allocation[cat];
				currentAllocation[cat] += (holdingAllocation * holding.pct);
			});
		}
	});

	// compares the current to targets, and creates the delta hash
	for (var key in currentAllocation) {
		if (delta[key] === 0) {
			// don't need to check non-target categories, they will always be sold.
			delta[key] = currentAllocation[key] - targetAllocation[key];
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

	holdings.forEach(holding => {
		if (holding.sellAll) {
			sellAmount += (holding.value);
			orders.sell[holding.symbol] = "all";
		}
	});
	
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