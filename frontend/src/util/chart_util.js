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
			if (category === 'bonds' || category === 'usStocks') {
				console.log(category, holding.asset.allocation[category]);
				console.log(category, holding.pct);
			}
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
	return formatDataKeys(data);
};

const formatDataKeys = data => {
	data.forEach(dataPair => {
		switch (dataPair.name) {
			case "indStocks":
				dataPair.name = "Stocks";
				break;
			case "usStocks":
				dataPair.name = "US Equity";
				break;
			case "forStocks":
				dataPair.name = "Foreign Equity";
				break;
			case "bonds":
				dataPair.name = "Fixed Income";
				break;
			case "eM":
				dataPair.name = "Emerging Markets";
				break;
			case "smallCap":
				dataPair.name = "US Small Cap";
				break;
			default:
				break;
		}
	});
	return data;
};