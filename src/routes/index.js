const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const healthCheck = require('./healthCheck');
const HttpException = require('../helpers');
const order = require('./order');
const pieces = require('./pieces');

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/v1/health-check', healthCheck);
app.use('/api/', order);
app.use('/api/', pieces);

app.use((req, res, next) => {

  const error = new HttpException(404, 'Not found');
  next(error);

});

app.use((error, req, res, next) =>
  {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    res.status(status).json({status, message});
  }
);

module.exports = app;