const Favorite = require('../models/favoritePlace');
const buildParams = require('./helpers').buildParams;

const validParams = ['_place'];

function find(req,res,next){
	Favorite.findById(req.params.id).then(fav => {
		req.mainObj = fav;
		req.favorite = fav;
		next();
	}).catch(next);
}

function create(req,res) {
	let params = buildParams(validParams, req.body);
	params['_user'] = req.user.id;

	Favorite.create(params)
		.then(fav => {
			res.json(fav)
		}).catch(err => {
			res.status(422).json({err})
		})
}

function destroy(req,res) {
	req.favorite.remove().then(doc => {
		res.json({
			message: 'favorito eliminado',
			name: doc.name
		})
	}).catch(err => {
		res.status(500).json(err)
	})
}

module.exports = { find, create, destroy }