const { getRoles } = require("./roles");
const { verifyToken, authPermissions } = require("./auth");

module.exports = {
  getRoles,
  verifyToken,
  authPermissions
};
