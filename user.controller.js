const Users = require('./user.schema');

module.exports = {
  signup(req, res) {
    let userRequestObject = req.body;

    Users.create(userRequestObject).then(user => {
      return res
        .status(201)
        .json({ message: 'user created successfully', user });
    });
  }
};
