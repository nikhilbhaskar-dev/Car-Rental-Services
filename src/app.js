const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Car Rental API!');
});

app.use('/api/cars', require('./routes/cars'));

module.exports = app;