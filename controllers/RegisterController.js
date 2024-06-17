const express = require("express");
const argon2 = require("argon2");
const User = require("../models/user");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password);
    
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
