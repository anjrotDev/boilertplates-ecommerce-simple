const { verifyJwt } = require("../helpers");
const UsersModels = require("../models/Users");

exports.verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send("No token provided");
  const token = req.headers.authorization.replace(/^Bearer\s+/, "");
  try {
    const verify = verifyJwt(token);

    const user = await UsersModels.findById(verify.id, { password: 0 });
    if (!user) return res.status(401).send("User does not exists");

    req.body.user = user;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
