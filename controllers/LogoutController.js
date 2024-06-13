const express = require("express");
const User = require("../models/user");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.refreshToken = null;
    await user.save();
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
