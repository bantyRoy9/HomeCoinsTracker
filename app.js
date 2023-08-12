const express = require('express');
const cors = require('cors');
const app = express();
const accountRoute = require('./Routes/accountRoute');

app.use(cors());
app.use(express.json());
app.use('/api/v1/userController',accountRoute)

module.exports = app

