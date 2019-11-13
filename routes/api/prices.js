const express = require("express");
const router = express.Router();
const request = require('request');

const axios = require('axios');
const passport = require('passport');


router.get('/:symbol', (req) => {

	const symbol = req.params.symbol;

	const data = request(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=sk_7ec0dc7305f34972831c339e4fde04ee`, { json: true }, (err, res, body) => {
		const data = {
			symbol: res.body.symbol,
			price: res.body.latestPrice
		}
		return data;
	});

	return data;
	
	// axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=sk_7ec0dc7305f34972831c339e4fde04ee`)
	// 	.then(data => res.json(data))
	// 	.catch(err => console.log(err));


});

module.exports = router;