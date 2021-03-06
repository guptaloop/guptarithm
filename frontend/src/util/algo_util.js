
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

		if (
			categories.includes('bonds') || categories.includes('other') || 					categories.includes('eM') || categories.includes('smallCap')
		)
		{
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
	const orders = { 
		"sell": {}, 
		"buy": {"VEA": 0, "IVV": 0}
	};
	
	// let sellAmount = 0;
	
	holdings.forEach(holding => {
		if (holding.sellAll) {
			// sellAmount += (holding.value);
			orders.sell[holding.symbol] = "all";
		}
	});

	// handles when target classes are ALL underweight
	const veaBuyAmt = (-delta['forStocks'] * portValue) / 100;
	const veaQty = Math.floor(veaBuyAmt / prices['VEA']);
		orders.buy['VEA'] += veaQty;
	const ivvBuyAmt = (-delta['usStocks'] * portValue) / 100;
	const ivvQty = Math.floor(ivvBuyAmt / prices['IVV']);
		orders.buy['IVV'] += ivvQty;

	return orders;
};