const express = require('express')
const router = express.Router();

const visitController = require('../controllers/visitController');
const authenticateOwner = require('../middlewares/authenticationOwner');

const jwtMiddleware = require('express-jwt');
const secret = require('../config/seccrets')

router.route('/')
	.get(jwtMiddleware({secret: secret.jwtSecret}),visitController.index)
	.post(visitController.create)

router.route('/:visit_id')
	.delete(visitController.find, authenticateOwner, visitController.destroy)

module.exports = router;