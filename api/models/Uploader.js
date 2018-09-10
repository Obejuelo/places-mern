const cloudinary = require('cloudinary');
const secrets = require('../config/seccrets');

cloudinary.config(secrets.cloudinary);

module.exports = (imagePath) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(imagePath, (result) => {
			console.log(result);
			if(result.secure_url) return resolve(result.secure_url);

			reject(new Error('Error with cloudinary'))
		})
	})
}