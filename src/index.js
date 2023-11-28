const config = require('./config/app');
const app = require('./app');
const sendEmail = require('./utils/emailService');
const db = require('./loaders/mongodb');

async function startServer() {
	app.listen(config.port, (err) => {
		if (err) {
			process.exit(1);
			return;
		}
		console.log(`

################################################

🛡️ Server listening on port: ${config.port} 🛡️

################################################

`);
	});

	db();
}

startServer();
