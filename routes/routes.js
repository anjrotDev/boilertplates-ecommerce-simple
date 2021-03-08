const express = require("express");
const router = express.Router();
const { getRoles } = require("../middlewares/roles");

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
  router.get("/users", UsersControllers.getAllData);
  router.get("/users/:id", UsersControllers.getDataById);
  router.put("/users/:id", UsersControllers.updateData);
  router.delete("/users/:id", UsersControllers.deleteData);

  //Products Routes
  router.get("/products", ProductsControllers.getAllData);
  router.get("/products/:id", ProductsControllers.getDataById);
  router.put("/products/:id", ProductsControllers.updateData);
  router.post("/products", ProductsControllers.createData);
  router.delete("/products/:id", ProductsControllers.deleteData);

  //roles Routes
  router.get("/roles", RolesControllers.getAllData);
  router.get("/roles/:id", RolesControllers.getDataById);
  router.put("/roles/:id", RolesControllers.updateData);
  router.post("/roles", RolesControllers.createData);
  router.delete("/roles/:id", RolesControllers.deleteData);

  return router;
};
