const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const invalidToken = req.body.token.split(" ")[1];

    const user = await User.findOne({
      where: { user_token_access: invalidToken },
    });

    if (!user) {
      return res.status(444).json({ message: "Error token" });
    }

    if (!user.user_token_refresh) {
      return res.status(444).json({ message: "Error token" });
    }

    jwt.verify(user.user_token_refresh, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    user.user_token_access = newAccessToken;

    await user.save();

    res.status(201).json({ newAccessToken });
  } catch (error) {
    return res.status(444).json({ message: "Error token" });
  }
});
