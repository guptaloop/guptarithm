import axios from 'axios';

export const fetchPrices = symbol => {
	return axios.get(`api/prices/${symbol}`);
};

export const updatePrice = symbol => {
	return axios.put(`api/prices/`);
};

export const fetchPriceFromDB = symbol => {
	return axios.get(`api/prices/price/${symbol}`);
};

export const updatePrices = () => {
	axios.get(`api/prices/`)
		.then(res => {
			const symbols = res.data; // all symbols from Price table as an array.
			symbols.forEach(symbol => {
				fetchPrices(symbol) // fetchPrice from the IEX API
					.then(res => {
						const price = res.data.latestPrice;
						axios.put(`api/prices/`, [symbol, price]); // update Price in table
					});
			});
		});
};