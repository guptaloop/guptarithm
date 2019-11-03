import {fetchAssetAl} from '../util/asset_util';

// this first method is called from the component, it loops through the holdings > calcs total PortValue and assigns other atts to the holding for easy use later.
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
			holding.price = parseFloat(price);
			holding.value = price * shares;
			holding["allocation"] = assets[holding.symbol]["allocation"];
	}
	// kicks off the next function, ultimately need to return this to the component
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
	return getCurrentAllocation(portValue, holdings, prices);
};


const getCurrentAllocation = (portValue, holdings, prices) => {
	let currentAl = {
		usStocks: 0.00,
		forStocks: 0.00,
	 	bonds: 0.00,
	 	indStocks: 0.00,
	 	em: 0.00,
	 	smallCap: 0.00,
	 	other: 0.00,
	};

	for (let i = 0; i < holdings.length; i++) {
		let holding = holdings[i];
		// let categories = Object.keys(holding.allocation);
		// console.log(categories);

		// for (let i = 0; i < categories.length; i++) {
		// 	let category = categories[i];
		// 	let holdingAl = holding.allocation[categories[i]];
		// 	let holdingPct = holding.pct;
		// 	allocation[category] += (holdingAl * holdingPct);
		// }
	}
};
	//check your work
	// let pcts = Object.values(allocation);
	// let totalAllocation = 0.0;
	// for (let i = 0; i < pcts.length; i++) {
	// 	if (pcts[i] === 0 ) { 
	// 		continue;
	// 	} else if (pcts[i] < 0) {
	// 		break;// and raise an error
	// 	} else {
	// 		totalAllocation += pcts[i];
	// 	}
	// }
	// return ([allocation, totalAllocation]);
	// if (Math.round(totalAllocation) === 100) {
	// 	return allocation;
	// } else {
	// 	return totalAllocation;
	// }
// };

// const compareToTarget = (targetAls, holdingAls) => {
// 	const diff = { usStocks: 0, forStocks: 0 };

// 	for (var key in holdingAls) {
// 		if (diff[key] === 0) {
// 			diff[key] = holdingAls[key] - targetAls[key]; 
// 		}
// 	}
// 	// check your work
// 	let checkSum = 0;
// 	for (var keys in diff) {
// 		checkSum += diff[keys];
// 	}
// 	return diff;
// };

// const recOrders = (diff, whitelist) => {
// 	for (var key in diff) {
// 		if ((key === 'usStocks' || 'forStocks') && Math.abs(diff[key]) >= 0.005) {
// 			if (diff[key] > 0) {
// 				recSellAmounts(key, diff[key], whitelist);
// 			} else if (diff[key] < 0) {
// 				recBuyAmounts(key, diff[key], whitelist);
// 			}
// 		}
// 	}

// };

// const recSellAmounts = (assetClass, diff, whitelist) => { 
	
// 	for (let i = 0; i < whitelist.length; i++) {
// 		if (whitelist[i][assetClass]) {
// 			const fundSymbol = whitelist[i][assetClass].symbol;
// 			const fundPrice = whitelist[i][assetClass].price;	
// 			// multiply diff by the Portfolio Value
// 			// 
// 		}
// 	}
// 	// console.log(fundPrice, fundSymbol);
// };

// const recBuyAmounts = (assetClass, diff, whitelist) => {
// 	// console.log(assetClass, diff, whitelist);
// };

// const targetAls = { usStocks: 0.55, forStocks: 0.45 };
// const whitelist = [
// 	{	usStocks: {	symbol: 'IVV', price: 150.86	}},
// 	{ forStocks: { symbol: 'VXUS', price: 88.91	}}
// ];
// const totalVal = getPortfolioValue(holding_1, holding_2, holding_3, holding_4);
// const holdingPcts = getHoldingPercentages(totalVal, holding_1, holding_2, holding_3, holding_4);
// const holdingAls = getCurrentAllocation(holding_1, holding_2, holding_3, holding_4);
// const diff = compareToTarget(targetAls, holdingAls[0]);
// recOrders(diff, whitelist);
// 	// [{
// 	// 	usStocks: 59.63153712992144,
// 	// 	forStocks: 0,
// 	// 	bonds: 21.82903605491535,
// 	// 	indStocks: 16.9813683127885,
// 	// 	em: 0,
// 	// 	smallCap: 0,
// 	// 	other: 1.5580585023747173
// 	// },
// 	// 	100.00000000000001]


// const holding_1 = {
// 	// id: 1, // null false, unique with all foreign keys
// 	account_id: 2, // null: false, f_key => account table, dupes allowed
// 	name: 'S&P 500 Fund',	// null: false
// 	symbol: 'IVV',	// null: false, unique with account_id
// 	type: 'etf', // null: false => etf, mf, stock, other
// 	exp_ratio: 0.0005, // NUMBER, null: false, enter as BP >> 1 BP = 0.01%
// 	share_qty: 100.0,	// FLOAT null: false
// 	allocation: [], // asset class hash?
// 	// pur_price: 100.00, // FLOAT, price per share (avg of tax lots)
// 	// cost_basis: 5000.0, // FLOAT, total
// 	// cur_price: 150.86, // DO NOT include in database
// };

// const holding_2 = {
// 	// id: 2, // null false, unique with all foreign keys
// 	name: 'America Fund',	// null: false
// 	symbol: 'AMRFX',	// null: false, unique with account_id
// 	type: 'mutual fund', // null: false => etf, mf, stock, other
// 	exp_ratio: 0.0041, // FLOAT, null: false, always 0 for stocks or other
// 	qty: 200.58,	// FLOAT null: false
// 	pur_price: 100.00, // FLOAT, price per share (avg of tax lots)
// 	// cost_basis: 20000.0, // FLOAT, total
// 	// account_id: 2, // null: false, f_key => account table, dupes allowed
// 	// allocation_id: 1, // asset class hash?
// 	cur_price: 150.86, // DO NOT include in database
// };

// const holding_3 = {
// 	// id: 1, // null false, unique with all foreign keys
// 	name: 'Apple',	// null: false
// 	symbol: 'AAPL',	// null: false, unique with account_id
// 	type: 'stock', // null: false => etf, mf, stock, other
// 	exp_ratio: 0.0, // FLOAT, null: false, always 0 for stocks or other
// 	qty: 50.0,	// FLOAT null: false
// 	pur_price: 150.00, // FLOAT, price per share (avg of tax lots)
// 	// cost_basis: 5000.0, // FLOAT, total
// 	// account_id: 1, // null: false, f_key => account table, dupes allowed
// 	// allocation_id: 1, // asset class hash?
// 	cur_price: 230.86, // DO NOT include in database
// };
// const holding_4 = {
// 	// id: 1, // null false, unique with all foreign keys
// 	name: 'Total Bond Fund',	// null: false
// 	symbol: 'BND',	// null: false, unique with account_id
// 	type: 'etf', // null: false => etf, mf, stock, other
// 	exp_ratio: 0.0003, // FLOAT, null: false, always 0 for stocks or other
// 	qty: 100.0,	// FLOAT null: false
// 	pur_price: 80.00, // FLOAT, price per share (avg of tax lots)
// 	// cost_basis: 5000.0, // FLOAT, total
// 	// account_id: 1, // null: false, f_key => account table, dupes allowed
// 	// allocation_id: 1, // asset class hash?
// 	cur_price: 110.86, // DO NOT include in database
// };

// const account_roth = {
// 	id: 2, // null false, unique with all foreign keys
// 	name: 'Abhi ROTH IRA *9568', // null: false
// 	type: 'Roth IRA', // null: false => IRA, Roth IRA, 401(k), IND Taxable, JT Taxable
// 	taxable: 'false', // BOOLEAN null: false,
// 	// cash: 1389.0, // FLOAT, null: false
// };
// const account_ira = {
// 	id: 1, // null false, unique with all foreign keys
// 	name: 'Abhi IRA *2459', // null: false
// 	type: 'IRA', // null: false => IRA, Roth IRA, 401(k), IND Taxable, JT Taxable
// 	taxable: 'false', // BOOLEAN null: false,
// 	// cash: 1389.0, // FLOAT, null: false
// };


// const tax_lot = {
// 	id: 1, // null false, unique with all foreign keys
// 	pur_date: '3/15/2018',
// 	long: 'true', // BOOLEAN null: false, false if pur date unknown
// 	qty: 50.0, //	FLOAT, null: false
// 	pur_price: 100.0, // FLOAT, null: false
// 	cost_basis: 5000.0, // FLOAT, null: false
// 	holding_id: 1, // null: false, f_key => holding table, dupes allowed
// 	account_id: 1, // null: false, f_key => account table, dupes allowed
// };
