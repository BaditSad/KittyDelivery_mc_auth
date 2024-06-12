const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  const invalidToken = req.body.token.split(" ")[1];
  try {
    const user = await User.findOne({ where: { accessToken: invalidToken } });
    if (!user) {
      return res.status(444).json({ message: "User not found!" });
    }
    if (!user.refreshToken) {
      return res.status(444).json({ message: "No refresh token available!" });
    }
    jwt.verify(user.refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    user.accessToken = newAccessToken;
    await user.save();
    res.status(200).json({ message: "Token refreshed successfully!", newAccessToken });
  } catch (error) {
    return res.status(444).json({ message: "Invalid token!" });
  }
});
