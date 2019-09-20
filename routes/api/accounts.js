const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Account = require('../../models/Account');
const validateAccountInput = require('../../validation/accounts');

// delete this one -- never need to get ALL accounts
// router.get('/', (req, res) => {
// 	Account.find()
// 		.sort({ date: -1 })
// 		.then(accounts => res.json(accounts))
// 		.catch(err => res.status(404).json({
// 			noaccountsfound: 'No accounts found'
// 		}));
// });

router.get('/user/:user_id', (req, res) => {
	Account.find({ user: req.params.userId })
		.then(accounts => res.json(accounts))
		.catch(err => res.status(404).json({
			noaccountsfound: 'No accounts found for this user'
		}));
});

router.get('/:id', (req, res) => {
	Account.findById(req.params.id)
		.then(account => res.json(account))
		.catch(err => res.status(404).json({
			noaccountfound: 'This account does not exist'
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

module.exports = router;