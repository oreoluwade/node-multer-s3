const express = require('express');
const logger = require('morgan');

const app = express();

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
