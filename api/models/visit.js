const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const REACTION = ['like','love','disappointment','yumy','anger','disgust'];

let visitSchema = new mongoose.Schema({
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	_place: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Place',
		required: true
	},
	reaction:{
		type:String,
		enum: REACTION
	},
	observation: String
})

visitSchema.statics.forUser = function(userId, page) {
	return Visit.paginate(
		{'_user': userId},
		{page: page, limit: 5, sort:{'_id': -1}});
}

mongoose.plugin(paginate);

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;