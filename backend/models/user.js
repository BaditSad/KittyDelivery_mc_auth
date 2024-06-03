const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getNewJwt = function() {
  return jwt.sign({ id: this._id, email: this.email, username: this.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

UserSchema.methods.generateRefreshToken = function() {
  const refreshToken = jwt.sign({ id: this._id, email: this.email, username: this.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  this.refreshToken = refreshToken;
  return refreshToken;
};

module.exports = mongoose.model('User', UserSchema);
