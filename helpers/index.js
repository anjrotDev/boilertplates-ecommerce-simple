const { encryptPassword, decryptPassword } = require("./encryptPass");
const { createToken } = require("./jwt");

module.exports = {
  encryptPassword,
  createToken,
  decryptPassword
};
