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

router.post('/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateAccountInput(req.body);

		if(!isValid) {
			return res.status(400).json(errors);
		}

		const newAccount = new Account({
			name: req.body.name,
			user: req.user.id
		});
		// save the account and json the response
		newAccount
			.save()
			.then(account => res.json(account));
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