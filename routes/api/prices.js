const express = require("express");
const router = express.Router();
const request = require('request');
const keys = require('../../config/keys');
const MongooseQueue = require('mongoose-queue').MongooseQueue;

const Price = require('../../models/Price');

router.use((req, res, next) => {
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

router.get('/:symbol', (req, res) => {
	const queue = new MongooseQueue('Price', 'guptarithm-price-api');
	queue.add('Price', function (err, jobId) {
		request(
			// url for 1 stock per request
			{ url: `https://cloud.iexapis.com/stable/stock/${req.params.symbol}/quote?token=${keys.IEX}` },
			// url for batch request
			// { url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${req.params.symbols}&types=quote&token=${keys.IEX}` },
			(error, response, body) => {
				if (error || response.statusCode !== 200) {
					return res.status(500).json({ type: 'error', message: error.message });
				}
				res.json(JSON.parse(body));
			}
		);
	});
	// console.log(queue);
});

// get ALL symbols from prices table
router.get('/', (req, res) => {
	Price.find()
		.then(prices => {
			// prices.forEach(el => console.log(el.symbol));
			const symbols = prices.map(el => el.symbol);
			return res.json(symbols);
		});
});

router.get('/price/:symbol', (req, res) => {
	Price.findOne({ symbol: req.params.symbol })
		.then(price => res.json(price));
});

// update Price for individual security, by its symbol
router.put('/', (req, res) => {
	// req.body => ['AAPL', 500.55]
	Price.findOne({ symbol: req.body[0] })
		.then(price => {
			price.date = new Date();
			price.price = req.body[1];
			price.save()
				.then(price => res.json(price));
		});
});

// save a NEW price
router.post('/', (req, res) => {
	const newPrice = new Price({
		symbol: req.body[0],
		price: req.body[1],
	});

	newPrice
		.save()
		.then(price => res.json(price));
});

module.exports = router;