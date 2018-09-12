const Application = require('../models/application');
const buildParams = require('./helpers').buildParams;

const validParams = ['origins', 'name'];

function find(req, res, next) {
	Application.findById(req.params.id).then(app => {
		req.mainObj = app;
		req.application = app;
		console.log(req.application);
		next();
	}).catch(next);
}

function index(req, res) {
	
}

function create(req, res) {
	let params = buildParams(validParams, req.body);

	Application.create(params)
		.then(app => {
			res.json(app)
		}).catch(err => {
			res.status(422).json({ err })
			console.log(err);
		})
}

function destroy(req, res) {
	req.application.remove().then(doc => {
		res.json({
			message: 'app eliminada',
			name: doc.name
		})
	}).catch(err => {
		res.status(500).json(err)
	})
}

module.exports = { find, create, destroy, index }