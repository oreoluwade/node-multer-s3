const express = require('express');
const multer = require('multer');
const UserController = require('./user.controller');

const { signup } = UserController;

const router = express.Router();

router.route('/signup').post(
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).fields([
    {
      name: 'avatar',
      maxCount: 1
    },
    {
      name: 'galleryPhoto',
      maxCount: 1
    }
  ]),
  signup
);

module.exports = router;
