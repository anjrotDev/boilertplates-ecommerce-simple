const jwt = require("jsonwebtoken");

exports.createToken = id => jwt.sign({ id }, "claveSecreta", { expiresIn: "1 day" });

exports.verifyJwt = token => jwt.verify(token, "claveSecreta");
