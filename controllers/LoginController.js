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
      { expiresIn: "7d" }
    );
    user.refreshToken = refreshToken;
    user.accessToken = token;
    await user.save();
    res.status(200).json({
      msg: "Connected!",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
