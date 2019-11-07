import axios from 'axios';

export const fetchPrice = symbol => {
	return axios.get(
		 `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=sk_7ec0dc7305f34972831c339e4fde04ee`
	);
};

