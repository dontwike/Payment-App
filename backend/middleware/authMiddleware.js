const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {

    const authorization = req.headers.authorization;
    console.log(authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(403).json({
      message: "Unauthorized",
    });
  }

  const splitAuth = authorization.split(" ");

  const token = splitAuth[1];

  if (!token) {
    res.status(403).json({
      message: "Unauthorized",
    });
  } else {
    try {
      const response = jwt.verify(token, JWT_SECRET);
      req.userId = response.userId;
      next();
    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = {
  authMiddleware,
};
