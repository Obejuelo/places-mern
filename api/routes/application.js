const express = require('express')
const router = express.Router();

const applicationController = require('../controllers/applicationController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const findUser = require('../middlewares/findUser');

const jwtMiddleware = require('express-jwt');
const secret = require('../config/seccrets')

router.all('*',jwtMiddleware({ secret: secret.jwtSecret }), findUser, authenticateAdmin)

router.route('/')
	.get(applicationController.index)
	.post(applicationController.create)

router.route('/:id')
	.delete(applicationController.find, applicationController.destroy)

module.exports = router;