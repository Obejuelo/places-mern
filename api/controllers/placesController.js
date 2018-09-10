const Place = require('../models/Place');
const upload = require('../config/upload');
const helpers = require('./helpers');

const validParams = ['title', 'description', 'address', 'acceptsCreditCard', 'openHour', 'closeHour'];

const find = (req, res, next) => {
	Place.findOne({slug: req.params.id})
		.then(place => {
			req.place = place
			next()
		})
		.catch(err => {
			next(err)
		})
}

const index = (req, res)=> {
	//Todos los lugares
	Place.paginate({}, { page: req.query.page || 1, limit : 10, sort: {'_id': -1}} )
		.then(docs => {
			res.json({ docs })
		})
		.catch(err => {
			console.log(err);
			res.json({ err })
		})
}

const create = (req, res, next) => {
	//Crear nuevos lugares
	let body = req.body;
	const params = helpers.buildParams(validParams, req.body)

	Place.create(params).then(doc => {
		req.place = doc;
		next();
	})
		.catch(err => {
			console.log(err);
			next(err);
		})
}

const show = (req, res) => {
	//Búsqueda individual
	res.json(req.place)
}

const update = (req, res) => {
	//Actualizar un recurso
	const params = helpers.buildParams(validParams, req.body)

	req.place = Object.assign(req.place, params)

	req.place.save()
		.then(doc => {
			res.json({ doc });
		})
		.catch(err => {
			console.log(err);
			res.json({ err })
		})
}

const destroy = (req, res) => {
	//Eliminar un recurso
	res.place.remove()
		.then(doc => {
			res.json({
				message: 'Elemento eliminado'
			})
			.catch(err => {
				console.log(err);
				res.json({ err })
			})
		})
}

const multerMiddleware = () => {
	return upload.fields([
		{name: 'avatar', maxCount: 1},
		{name: 'cover', maxCount: 1}
	]);
}

const saveImage = (req, res) => {
	if(req.place) {
		const files = ['avatar', 'cover'];
		const promises = [];

		files.forEach(imageType => {
			if ( req.files && req.files[imageType] ){
				const path = req.files[imageType][0].path;
				promises.push(req.place.updateImage(path, imageType));
			}
		})

		Promise.all(promises).then(results => {
			console.log(results);
			res.json(req.place);
		}).catch(err => {
			console.log(err);
			res.json(err);
		})

	} else {
		res.status(422).json({
			error: req.error || 'Could not save place'
		});
	}
}

module.exports = { index, create, show, update, destroy, find, multerMiddleware, saveImage}