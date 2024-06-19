const express = require("express");
const argon2 = require("argon2");
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const router = express.Router();

module.exports = router;

router.post("/", 
  [
    check('email').isEmail().withMessage('Email invalide'), 
    check('password').isLength({ min: 4 }).withMessage('Le mot de passe doit contenir au moins 8 caractères'), 
    check('name').not().isEmpty().withMessage('Le nom est requis'), 
    check('role').not().isEmpty().withMessage('Le rôle est requis'),
    check('phone').not().isEmpty().withMessage('Le téléphone est requis'),
    check('address').not().isEmpty().withMessage('L\'adresse est requise') 
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }

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
      message: "Utilisateur créé avec succès !",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
