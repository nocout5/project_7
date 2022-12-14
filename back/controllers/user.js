const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// creer un nouvel utilisateur, hash le mot de passe avec bcrypt,
// l'envoi dans la base de données mongodb.
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// permet le login d'un utilisateur, creer un token et l'enregistre dans un cookie http only
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          res.cookie("access_token", token, {
            httpOnly: true,
          });
          res.status(200).json({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// déconnecte l'utilisateur en suprimant le cookie qui contient le token
exports.logout = (req, res, next) => {
  res.cookie("access_token", "", {
    Expire: 0,
  });
  res.json({ message: "session ended" });
};
