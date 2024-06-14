const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = {
      user_name: req.body.name,
      user_password: hashedPassword,
      user_email: req.body.email,
      user_role: req.body.role,
      user_telephone: req.body.phone,
      user_address: req.body.address,
      user_account_status: "active",
    };

    await User.create(user);

    res.status(201).json({
      message: "Item posted!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
