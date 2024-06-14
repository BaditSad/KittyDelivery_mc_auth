const express = require("express");
const User = require("../models/user");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "Not found!" });
    }

    user.refreshToken = null;

    await user.save();

    res.status(201).json({ message: "Out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
