const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const router = express.Router();

module.exports = router;

router.post("/", 
  
  [
    check('email').isEmail().withMessage('Email invalide'), 
    check('password').not().isEmpty().withMessage('Le mot de passe est requis') 
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }
  
  try {
    const user = await User.findOne({ where: { user_email: req.body.email } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await argon2.verify(user.user_password, req.body.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { id: user.user_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "16h" }
    );

    user.user_token_refresh = refreshToken;
    user.user_token_access = token;

    await user.save();

    //if user_role === restaurateur alors address = restaurant_address where user_id = user_id
    res.status(201).json({
      id: user.user_id,
      address: user.user_address,
      role: user.user_role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
