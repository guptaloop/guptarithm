import {getPortfolioValue} from './algo_util';

export const getChartData = (holdings, prices) => {

	if (holdings === undefined) {
		return ([{ name: 'Group A', value: 400 }]);
	}
	const data = getPortfolioValue(holdings, prices, true);
	const portValue = data[0];
		holdings = data[1];
	
	// portValue determines when the algo_util returns usable data
	if (!portValue) {
		return ([{ name: 'Group A', value: 400 }]);
	} else {
		return chartAllocations(holdings);
	}
};

const chartAllocations = (holdings) => {
	const data = [];
	const dataKeys = [];

	holdings.forEach(holding => {
		let categories = Object.keys(holding.asset.allocation);
		categories.forEach(category => {
			const allocation = parseFloat(
				(holding.asset.allocation[category] * holding.pct).toFixed(2)
			);

			if (dataKeys.includes(category)) {
				data.forEach(el => {
					if (el.name === category) {
						el.value += allocation;
						return;
					}
				});
			} else {
				const dataPair = { name: category, value: allocation };
				dataKeys.push(category);
				data.push(dataPair);
			}
		});
	});
	
	return data;
};