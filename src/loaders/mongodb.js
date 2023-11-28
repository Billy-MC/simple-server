const mongoose = require('mongoose');

module.exports = async () => {
	const connectionString = `mongodb://localhost:27017`;

	if (!connectionString) {
		logger.error('connection string not defined');
		process.exit(1);
	}

	const connect = async () => {
		try {
			await mongoose.connect(connectionString);
			console.log('Successfully connected to database');
			return;
		} catch (error) {
			console.error('fail to connect DB');
			process.exit(1);
		}
	};
	connect();

	mongoose.connection.on('disconnected', () => {
		console.log('mongodb connection lost');
	});
};
