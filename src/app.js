const cors = require('cors');
const express = require('express');
const loader = require('./loaders');

const router = require('./routes/v1/api');

const app = express();

loader.init(app);

module.exports = app;
