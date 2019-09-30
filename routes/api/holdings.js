const express = require("express");
const router = express.Router();
const passport = require('passport');
const Holding = require('../../models/Holding');
const validateHoldingInput = require('../../validation/holding');

// get all holdings for a user by userId
router.get('/user/:user_id', (req, res) => {
	Holding.find({ user: req.params.user_id })
		.then(holdings => res.json(holdings))
		.catch(err => res.status(404).json({
			json: err, noholdingsfound: 'No holdings found for this user'
		}));
});

// get all holdings for an account by accountId
router.get('/user/:user_id', (req, res) => {
	Holding.find({ user: req.params.user_id })
		.then(holdings => res.json(holdings))
		.catch(err => res.status(404).json({
			json: err, noholdingsfound: 'No holdings found for this user'
		}));
});

// get a specific holding by its id
router.get('/:id', (req, res) => {
	Holding.findById(req.params.id)
		.then(holding => res.json(holding))
		.catch(err => res.status(404).json({
			json: err, noholdingfound: 'This holding does not exist'
		}));
});

// create a new holding
router.post('/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateHoldingInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newHolding = new Holding({
			user: req.user.id,
			account: req.body.account,
			allocation: req.body.allocation,
			symbol: req.body.symbol,
			name: req.body.name,
			type: req.body.type,
			exp_ratio: req.body.exp_ratio,
			shares: req.body.shares,
		});
		// save the Holding and json the response
		newHolding
			.save()
			.then(holding => res.json(holding));
	}
);

// delete a holding
router.delete('/:id', (req, res) => {
	Holding.findById(req.params.id)
		.then(holding => holding.delete())
		.catch(err => res.status(404).json({
			json: err, noholdingfound: 'This holding does not exist'
		}));
});

module.exports = router;