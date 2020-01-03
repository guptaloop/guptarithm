import axios from 'axios';

export const fetchPrices = symbol => {
	return axios.get(`api/prices/${symbol}`);
};

export const updatePrice = symbol => {
	return axios.put(`api/prices/`);
};

export const updatePrices = () => {
	axios.get(`api/prices/`)
		.then(res => {
			// get all the stock symbols from the Price collection, store as an array in symbols below
			const symbols = res.data;

			symbols.forEach(symbol => {
				fetchPrices(symbol)
					.then(res => {
						const price = res.data.latestPrice;
						axios.put(`api/prices/`, [symbol, price]);
					})
					.catch(err => {
						fetchPrices(symbol)
							.then(res => {
								const price = res.data.latestPrice;
								axios.put(`api/prices/`, [symbol, price]);
							});
					});
			});
		});
};