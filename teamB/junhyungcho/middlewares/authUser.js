const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const decoded = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    if (decoded) await next();
  } 
  catch (err) {
    next(err);
  }
};

module.exports = validateToken;
