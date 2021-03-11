const express = require("express");
const router = express.Router();
const { getRoles, verifyToken } = require("../middlewares");

const UsersControllers = require("../controllers/usersControllers");
const ProductsControllers = require("../controllers/productsControllers");
const RolesControllers = require("../controllers/rolesControllers");
const AuthControllers = require("../controllers/auth/authControllers");

module.exports = () => {
  router.get("/", (req, res) => res.send("Hola Mundo!!!"));

  // Auth Routes
  router.post("/auth/register", getRoles, AuthControllers.register);
  router.post("/auth/login", AuthControllers.login);

  //Users Routes
  router.get("/users", verifyToken, UsersControllers.getAllData);
  router.get("/users/:id", verifyToken, UsersControllers.getDataById);
  router.put("/users/:id", verifyToken, UsersControllers.updateData);
  router.delete("/users/:id", verifyToken, UsersControllers.deleteData);

  //Products Routes
  router.get("/products", ProductsControllers.getAllData);
  router.get("/products/:id", ProductsControllers.getDataById);
  router.put("/products/:id", verifyToken, ProductsControllers.updateData);
  router.post("/products", verifyToken, ProductsControllers.createData);
  router.delete("/products/:id", verifyToken, ProductsControllers.deleteData);

  //roles Routes
  router.get("/roles", verifyToken, RolesControllers.getAllData);
  router.get("/roles/:id", verifyToken, RolesControllers.getDataById);
  router.put("/roles/:id", verifyToken, RolesControllers.updateData);
  router.post("/roles", verifyToken, RolesControllers.createData);
  router.delete("/roles/:id", verifyToken, RolesControllers.deleteData);

  return router;
};
