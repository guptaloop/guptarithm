import axios from 'axios';

export const fetchPrice = symbol => {
	
	return axios.get(`api/prices/${symbol}`);

	// return axios.get(
	// 	`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=sk_7ec0dc7305f34972831c339e4fde04ee`
	// );
	
};

// headers:
// access - control - allow - credentials: "true"
// access - control - allow - headers: "Origin, X-Requested-With, Content-Type, Accept"
// access - control - allow - methods: "GET, OPTIONS"
// access - control - allow - origin: "*"
// content - encoding: "gzip"
// content - type: "application/json; charset=utf-8"
// date: "Wed, 13 Nov 2019 03:54:18 GMT"
// iexcloud - messages - used: "1"
// iexcloud - premium - messages - used: "0"
// server: "nginx"
// status: "200"
// strict - transport - security: "max-age=15768000"
// x - content - type - options: "nosniff"