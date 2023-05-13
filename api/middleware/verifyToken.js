const jwt = require("jsonwebtoken");

const verifyToken = function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ message: "Token is not valid" });
    }
  }
};

module.exports = { verifyToken };
