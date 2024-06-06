const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password, remember_me } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    console.log("🚀 ~ exports.login= ~ user:", user)
    

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    };

    const jwtToken = user.getNewJwt();
    let refreshToken;
    if (remember_me) {
      refreshToken = user.generateRefreshToken();
      await user.save();
    }

    res.json({
      user: payload.user,
      token: jwtToken,
      refreshToken: remember_me ? refreshToken : undefined
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
