const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./user.route');

dotenv.config();

const app = express();

//connect to mongodb
const DB_NAME = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(DB_NAME, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({
    message:
      'Alackaday! Welcome to simple upload, powered by NodeJS, multer, postman and aws-sdk!'
  });
});

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
