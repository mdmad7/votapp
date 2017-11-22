import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import passportConfig from './passport';
import user from './routes/user';

const server = express();
server.use(passport.initialize());
const PORT = 4000;

// Set up mongoose connection
mongoose.Promise = global.Promise;
const mongoDB = 'mongodb://localhost/votapp';
mongoose.connect(mongoDB, {
  useMongoClient: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// uncomment after placing your favicon in /public
// server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/v1/api/', user);

// catch 404 and forward to error handler
server.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
server.use((err, req, res) => {
  res.status(500);
  res.send(err);
});

server.listen(PORT, () => {
  console.log(`API Server Running at PORT: ${PORT}`);
});
