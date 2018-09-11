const express = require('express')
const router = express.Router();

const favoriteController = require('../controllers/favoriteController');
const authenticateOwner = require('../middlewares/authenticationOwner');

router.route('/')
	.post(favoriteController.create)

router.route('/:id')
	.delete(favoriteController.find, authenticateOwner, favoriteController.destroy)

module.exports = router;