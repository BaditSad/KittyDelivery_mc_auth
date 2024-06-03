const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.refresh = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    if (token !== user.refreshToken) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    const newAccessToken = user.getNewJwt();
    const newRefreshToken = user.generateRefreshToken();
    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      token: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
