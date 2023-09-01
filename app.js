const express = require('express');
const cors = require('cors');
const app = express();
const { sourceRoute, accountRoute, userRoutes } = require('./Routes');

app.use(cors());
app.use(express.json());
app.use('/api/v1/userController',userRoutes);
app.use('/api/v1/accountController', accountRoute);
app.use('/api/v1/sourceController', sourceRoute);

module.exports = app

