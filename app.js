const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const voucherRouter = require('./routes/voucher');


const authMiddleware = require('./middleware/middleware');

const app = express();

const dbUri = 'mongodb://localhost:27017/bandung-discovery'
mongoose.connect(dbUri)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authMiddleware.authCheck);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/voucher', voucherRouter);

app.listen(3000, () => {
  console.log('Running on port 3000');
})

module.exports = app;
