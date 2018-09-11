const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./Uploader');
const slugify = require('../plugins/slugify');

let placeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		unique: true
	},
	description: String,
	acceptsCreditCard: {
		type: Boolean,
		default: false
	},
	address: String,
	coverImage: String,
	avatarImage: String,
	openHour: Number,
	closeHour: Number,
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

placeSchema.methods.updateImage = function(path, imageType){
	//Primero subir la imagen
	//Guardar el lugar
	return uploader(path)
		.then(secure_url => this.saveImageUrl(secure_url, imageType));
}

placeSchema.methods.saveImageUrl = function(secureUrl, imageType) {
	this[imageType + 'Image'] = secureUrl;
	return this.save();
}

placeSchema.pre('save', function(next){
	// generateSlugAndContinue.call(this,0, next);
	this.slug = slugify(this.title);
	next();
});

// placeSchema.statics.validateSlugCount = function(slug){
// 	return place.count({slug: slug}).then(count => {
// 		if(count > 0 ) return false
// 		return true;
// 	})
// }

mongoose.plugin(mongoosePaginate);

// function generateSlugAndContinue(count, next) {
// 	this.slug = slugify(this.title);
// 	if(count != 0)
// 		this.slug = this.slu +"-"+count;

// 	place.validateSlugCount(this.slug).then(isValid => {
// 		if (!isvalid)
// 			this.slug = generateSlugAndContinue.call(this, count+1, next);
		
// 		next();
// 	})
// }


let place = mongoose.model('Place', placeSchema);

module.exports = place;