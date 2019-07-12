const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  galleryPhoto: {
    type: String
  }
});

const Users = mongoose.model('user', UserSchema);

module.exports = Users;
