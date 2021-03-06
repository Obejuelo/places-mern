const Usuario = require('../models/User');
const helpers = require('./helpers');

const validParams = ['email','name','password','admin'];

const create = (req, res, next) => {
	const params = helpers.buildParams(validParams, req.body)

	Usuario.create(params)
		.then(user => {
			req.user = user;
			// res.json(user);
			next();
		})
		.catch(err => {
			console.log(err);
			res.status(422).json(err)
		})
}

const myPlaces = (req,res) => {
	Usuario.findOne({'_id': req.user.id}).then(user => {
		user.places.then(places => {
			res.json(places);
		})
	}).catch(err => {
		res.json(err);
	})
}

module.exports = { create, myPlaces}