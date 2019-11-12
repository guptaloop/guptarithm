const express = require("express");
const router = express.Router();
const passport = require('passport');

const Account = require('../../models/Account');
const validateAccountInput = require('../../validation/accounts');

router.get('/user/:user_id', (req, res) => {
	Account.find({ user: req.params.user_id })
		.then(accounts => res.json(accounts))
		.catch(err => res.status(404).json({
			json: err, noaccountsfound: 'No accounts found for this user'
		}));
});

router.get('/:id', (req, res) => {
	Account.findById(req.params.id)
		.then(account => res.json(account))
		.catch(err => res.status(404).json({
			json: err, noaccountfound: 'This account does not exist'
		}));
});

// create new Account
router.post('/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateAccountInput(req.body);

		if(!isValid) {
			return res.status(400).json(errors);
		}

		const newAccount = new Account({
			user: req.body.userId,
			custodian: req.body.custodian,
			type: req.body.type,
			last4: req.body.last4,
		});
		// save the account and json the response
		newAccount
			.save()
			.then(account => res.json(account));
	}
);

// create new Holding
router.put('/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		
		// find the Asset data related to the new holding
		Asset.find({ symbol: req.body.symbol })
			// logic to see if the asset exists in the db will be handled on the Frontend by trying to retrieve the asset via actions / utils
			
			//below we format the newHolding data so that it can be pushed in to the Account's Holdings array
			.then(asset => {
				const assetInfo = {};
					assetInfo.type = asset[0].type;
					assetInfo.exp_ratio = asset[0].exp_ratio;
					assetInfo.allocation = asset[0].allocation;
				const newHolding = {
					symbol: req.body.symbol,
					shares: req.body.shares,
					asset: assetInfo
				};
				Account.findById(req.body.account)
					.then(account => {
						account.holdings.push(newHolding);
						account.save()
							.then(account => res.json(account));
					});
			});
	}
);

router.delete('/:id', (req, res) => {
	Account.findById(req.params.id)
		.then(account => account.delete())
		.catch(err => res.status(404).json({
			json: err, noaccountfound: 'This account does not exist'
		}));
});

module.exports = router;