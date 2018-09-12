const express = require('express')
const router = express.Router();

const visitController = require('../controllers/visitController');
const authenticateOwner = require('../middlewares/authenticationOwner');
const placesController = require('../controllers/placesController');

router.route('/:id/visit')
	.get(placesController.find,visitController.index)
	.post(placesController.find,visitController.create)

router.route('/:id/visit/:visit_id')
	.delete(visitController.find, authenticateOwner, visitController.destroy)

module.exports = router;