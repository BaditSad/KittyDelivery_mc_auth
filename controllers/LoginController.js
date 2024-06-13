const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_email: req.body.email } });
    if (!user) {
      return res.status(404).json({ message: "Cannot find user!" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.user_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user.user_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    user.user_token_refresh = refreshToken;
    user.user_token_access = token;
    await user.save();
    //if user_role === restaurateur alors address = restaurant_address where user_id = user_id
    res.status(200).json({
      id: user.user_id,
      address: user.user_address,
      role: user.user_role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
