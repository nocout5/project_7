const jwt = require("jsonwebtoken");

// vérifie la présence et la validité du token dans la requète de l'utilisateur
module.exports = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json("No token found");
    }
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
