const express = require("express");
const router = express.Router();
const request = require('request');

const Price = require('../../models/Price');

router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

router.get('/:symbol', (req, res) => {
	request(
		{	url: `https://cloud.iexapis.com/stable/stock/${req.params.symbol}/quote?token=sk_7ec0dc7305f34972831c339e4fde04ee` },
		(error, response, body) => {
			if (error || response.statusCode !== 200) {
				return res.status(500).json({ type: 'error', message: err.message });
			}

			res.json(JSON.parse(body));
		}
	)
});

// router.get('/:symbol', (req, res) => {
// 	// :symbol must be CAPS
// 	Price.findOne({ symbol: req.params.symbol })
// 		.then(price => res.json(price));
// });

// get ALL symbols from prices table
router.get('/', (req, res) => {
	Price.find()
		.then(prices => {
			const symbols = prices.map(el => el.symbol);
			return res.json(symbols);
		});
});

// update Price for individual security, by its symbol
router.put('/', (req, res) => {
	// req.body => ['AAPL', 500.55]
	Price.findOne({ symbol: req.body[0] })
		.then(price => {
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