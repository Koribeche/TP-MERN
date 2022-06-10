const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // extraire le token du headers authorization
    const token = req.headers.authorization.split(" ")[1];
    // vérifier la validiter du token
    jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
      if (err) {
        return res.status(401).json("Unauthorized");
      }

      // effectuer un traitement
      req.payload = payload;
      next();
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = auth;
