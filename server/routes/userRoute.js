const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Api pour créer un user
router.post("/register", async (req, res) => {
  try {
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Api pour connecté un user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("User n'existe pas");
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json("Mot de passe incorrecte");
    }

    const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);
    // iat  -> issued at
    res.json(token);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     /* dans le body on va retrouver l'email et le password
//     Récuperer le user avec son email
//     on vérifie est ce que l'utilisateur existe ou pas
//     vérifie la validité du password */

//     const user = await User.findOne({ email: req.body.email });

//     if (user) {
//       /* premier param c'est le password non crypté
//       deuxieme param c'est le password crypté */
//       const isMatch = await bcrypt.compare(req.body.password, user.password);
//       if (isMatch) {
//         res.json("connecté");
//       } else {
//         res.status(400).json("Mot de passe incorrecte");
//       }
//     } else {
//       res.status(400).json("User n'existe pas");
//     }
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// });

module.exports = router;
