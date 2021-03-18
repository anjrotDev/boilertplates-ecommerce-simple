const { verifyJwt, permissions } = require("../helpers");
const UsersModels = require("../models/Users");

exports.verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send("No token provided");
  const token = req.headers.authorization.replace(/^Bearer\s+/, "");
  try {
    const verify = verifyJwt(token);

    const user = await UsersModels.findById(verify.id, { password: 0 }).populate("roles");
    if (!user) return res.status(401).send("User does not exists");

    req.body.user = user;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.authPermissions = async (req, res, next) => {
  const { roles } = req.body.user;
  const { method, path } = req;

  const scope = path.split("/");

  const findPermissions = permissions.find(x => x.method === method);

  const methodPermissions = [...findPermissions.permissions, `${scope[1]}_${findPermissions.scope}`];

  console.log("req.body :>> ", methodPermissions);

  const getPermissions = roles.map(x => x.permissions);
  console.log("getPermissions :>> ", getPermissions);

  let count = 0;
  for (const assignPermissions of getPermissions) {
    for (const compare of methodPermissions) {
      if (assignPermissions.includes(compare)) {
        count++;
      }
    }
  }

  if (count === 0) return res.status(401).send("unauthorized!!");

  next();
};
