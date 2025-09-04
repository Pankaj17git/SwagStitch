const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
    } catch (err) {
      res.status(401).send({ errors: "please authentication using a valid token" })
    }
  }
}

module.exports = authMiddleware;