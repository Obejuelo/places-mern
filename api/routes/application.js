const express = require('express')
const router = express.Router();

const applicationController = require('../controllers/applicationController');
const authenticateOwner = require('../middlewares/authenticationOwner');

const jwtMiddleware = require('express-jwt');
const secret = require('../config/seccrets')

router.route('/')
	.get(jwtMiddleware({ secret: secret.jwtSecret }), applicationController.index)
	.post(applicationController.create)

router.route('/:id')
	.delete(applicationController.find, applicationController.destroy)

module.exports = router;