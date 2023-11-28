const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const logger = require('morgan');
const apiRouter = require('../routes/v1/api');
const config = require('../config/app');

dotenv.config();

module.exports = async (app) => {
	app.use(
		cors({
			origin: 'http://localhost:3000',
			methods: 'GET,POST,PUT,PATCH,DELETE',
		})
	);
	app.use(express.json());
	app.use(logger('dev'));
	app.use(config.api.prefix, apiRouter);
	app.use(cookieParser());
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
		})
	);
	return app;
};
