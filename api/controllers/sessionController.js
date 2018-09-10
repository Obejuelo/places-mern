const jwt = require('jsonwebtoken');
const secret = require('../config/seccrets');
const User = require('../models/User');

const authenticate = (req, res ,next) => {
	User.findOne({email:req.body.email})
		.then(user => {
			user.verifyPassword(req.body.password)
				.then(valid => {
					if(valid){
						req.user = user;
						next();
					} else {
						next(new Error('INVALID CREDENTIALS'))
						res.json({message: 'invalid credentials'})
					}
				})
		}).catch(error => next(error))
}

const generateToken = (req, res, next) => {
	if(!req.user) return next();

	req.token = jwt.sign({id:req.user._id}, secret.jwtSecret);

	next();
}

const sendToken = (req, res) => {
	if(req.user){
		res.json({
			user: req.user,
			jwt: req.token
		});
	} else {
		res.status(422).json({
			error: 'could not generate token'
		});
	}
}

module.exports = {
	authenticate,
	generateToken,
	sendToken
}