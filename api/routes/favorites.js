const express = require('express')
const router = express.Router();

const favoriteController = require('../controllers/favoriteController');
const authenticateOwner = require('../middlewares/authenticationOwner');
const findUser = require('../middlewares/findUser');

const jwtMiddleware = require('express-jwt');
const secret = require('../config/seccrets')

router.route('/')
	.get(jwtMiddleware({secret: secret.jwtSecret}),findUser, favoriteController.index)
	.post(favoriteController.create)

router.route('/:id')
	.delete(favoriteController.find, authenticateOwner, favoriteController.destroy)

module.exports = router;