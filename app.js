const express = require('express');
const cors = require('cors');
const app = express();
const { sourceRoute, accountRoute, userRoutes, activityRoute } = require('./Routes');
const bodyParser = require('body-parser');
const AppError = require('./Utils/appError');
const globleErrorHandler = require('./Controllers/errorController');
app.use(bodyParser());
app.use(cors());
app.use(express.json());
app.use('/api/v1/userController',userRoutes);
app.use('/api/v1/accountController', accountRoute);
app.use('/api/v1/sourceController', sourceRoute);
app.use('/api/v1/activityController', activityRoute);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't found ${req.originalUrl} on this server`, 404));
})

app.use(globleErrorHandler)

module.exports = app

