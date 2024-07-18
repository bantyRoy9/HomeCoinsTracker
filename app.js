const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { sourceRoute, accountRoute, userRoutes, activityRoute, groupRoute, chatRoute } = require('./Routes');
const bodyParser = require('body-parser');
const AppError = require('./Utils/appError');
const globleErrorHandler = require('./Controllers/errorController');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './Utils/Templates'));
app.use(bodyParser());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/home', (req, res) => {
    res.render('Home');
});

app.use('/api/v1/userController',userRoutes);
app.use('/api/v1/accountController', accountRoute);

app.use('/api/v1/sourceController', sourceRoute);
app.use('/api/v1/activityController', activityRoute);
app.use('/api/v1/groupController', groupRoute);
app.use('/api/v1/chatController', chatRoute)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't found ${req.originalUrl} on this server`, 404));
})

app.use(globleErrorHandler)

module.exports = app

