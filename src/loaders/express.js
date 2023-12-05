const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const logger = require('morgan');
const apiRouter = require('../routes/v1/api');
const config = require('../config/app');

require('../libs/passport');

dotenv.config();

module.exports = async (app) => {
	app.use(
		cors({
			// origin: '*',
			// credentials: true,
			allowedHeaders: ['Content-Type', 'Authentication'],
			methods: 'GET,POST,PUT,PATCH,DELETE',
		})
	);

	app.use(express.json());
	app.use(logger('dev'));
	app.use(cookieParser());

	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(config.api.prefix, apiRouter);

	return app;
};
