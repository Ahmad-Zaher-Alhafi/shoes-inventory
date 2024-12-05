const { Router } = require("express");
const inventoryController = require("../controllers/inventorycontroller");

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getAllShoes);

module.exports = inventoryRouter;
