const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getAllShoes);
inventoryRouter.get("/edit/:id", inventoryController.getShoe);

module.exports = inventoryRouter;
