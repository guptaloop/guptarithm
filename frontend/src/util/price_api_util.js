import axios from 'axios';

export const fetchPrice = symbol => {
	
	// return axios.get(`api/assets/${symbol}`);

	// return axios.get(
	// 	`https://marketdata.websol.barchart.com/getQuote.json?apikey=a57149ccf206b50529f1a79252c20e73&symbols=${symbol}`
	// );
	
	// URL for IEX Cloud - prob would never hit the limits, but it has time restrictions, and can't get past Chrome's CORS issue
	return axios.get(
		`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=sk_7ec0dc7305f34972831c339e4fde04ee`
	);

	// Can batch up multiple symbols in one request (can make 400 getQuote queries per day, with up to 25 symbols per)
	// 	 `https://marketdata.websol.barchart.com/getQuote.json?apikey=a57149ccf206b50529f1a79252c20e73&symbols=AAPL%2CGOOG`
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