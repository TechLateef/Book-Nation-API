const express = require("express");
const {
  registerStore,
  updateStore,
  deleteStore,
  getOne,
  getAll,
} = require("../controllers/Store.controller");
const { AuthenticationMiddleware } = require("../middlewares/Authorization");

const storeRouter = express.Router();

storeRouter.route("/").get(getAll).post(registerStore);

storeRouter.use(AuthenticationMiddleware);

storeRouter.route("/:id").get(getOne).patch(updateStore).delete(deleteStore);

module.exports = storeRouter;
