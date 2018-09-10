const mongoose = require('mongoose');

const dbName = 'places-api';

module.exports = {
	connect: () => mongoose.connect('mongodb://localhost/' + dbName, { useNewUrlParser: true }),
	dbName,
	connection: () => {
		if(mongoose.connection)
			return mongoose.connection
		return this.connect
	}
}