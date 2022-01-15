const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    // Forbidden
    res.status(403).send("A token is required for authentication");
  }

  try {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    const decoded = jwt.verify(bearerToken, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
