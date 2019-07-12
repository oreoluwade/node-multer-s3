const express = require('express');
const UserController = require('./user.controller');

const { signup } = UserController;

const router = express.Router();

router.route('/signup').post(signup);

module.exports = router;
