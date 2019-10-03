const express = require("express");
const router = express.Router();
const passport = require('passport');

const Asset = require('../../models/Asset');
const validateAssetInput = require('../../validation/asset');

// get a specific asset by its id
router.get('/:symbol', (req, res) => {
	Asset.findOne({symbol: req.params.symbol })
		.then(asset => res.json(asset))
		.catch(err => res.status(404).json({
			json: err, noassetfound: 'This asset does not exist'
		}));
});

// create a new asset
router.post('/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateAssetInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newAsset = new Asset({
			symbol: req.body.symbol,
			name: req.body.name,
			type: req.body.type,
			exp_ratio: req.body.exp_ratio,
			allocation: {
				usStocks: req.body.usStocks,
				forStocks: req.body.forStocks,
				eM: req.body.eM,
				smallCap: req.body.smallCap,
				indStocks: req.body.indStocks,
				bonds: req.body.bonds,
				other: req.body.other,
			},
		});
		// save the asset and json the response
		newAsset
			.save()
			.then(asset => res.json(asset));
	}
);

// edit an existing asset
// router.put('/:id',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		const { errors, isValid } = validateAssetInput(req.body);

// 		if (!isValid) {
// 			return res.status(400).json(errors);
// 		}

// 		const asset = Asset.findByIdAndUpdate(req.params.id, {
// 			// FIX ?? defaults to null if the value isn't given
// 			symbol: req.body.symbol,
// 			name: req.body.name,
// 			type: req.body.type,
// 			exp_ratio: req.body.exp_ratio,
// 			allocation: {
// 				usStocks: req.body.usStocks,
// 				forStocks: req.body.forStocks,
// 				eM: req.body.eM,
// 				smallCap: req.body.smallCap,
// 				indStocks: req.body.indStocks,
// 				bonds: req.body.bonds,
// 				other: req.body.other,
// 			},
// 		});
// 		// save the asset and send json the response
// 		asset
// 			.update()
// 			// FIX ?? res.json(asset) returns an unnecessary object
// 			.then(asset => res.json(asset));
// 	}
// );

// delete an asset
router.delete('/:id', (req, res) => {
	Asset.findById(req.params.id)
		.then(asset => asset.delete()).then(res.json())
		.catch(err => res.status(404).json({
			json: err, noassetfound: 'This asset does not exist'
		}));
});

module.exports = router;