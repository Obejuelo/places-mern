const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');
const Place = require('./Place');

let userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: String,
	admin: {
		type: Boolean,
		default: false
	}
});

// userSchema.post('save', function(req,res,next){
// 	User.count({}).then(count => {
// 		if(count ==1){
// 			User.update({'_id': req._id}, {admin:true}).then(result=> {
// 				console.log(result);
// 				next();
// 			})
// 		} else {
// 			next();
// 		}
// 	});
// });

userSchema.virtual('places').get(function(){
	return Place.find({'_user': this._id});
})

userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;