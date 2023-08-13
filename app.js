const express = require('express');
const cors = require('cors');
const app = express();
const accountRoute = require('./Routes/accountRoute');
const userRouter = require('./Routes/userRoutes')

app.use(cors());
app.use(express.json());
app.use('/api/v1/userController',userRouter);

module.exports = app

