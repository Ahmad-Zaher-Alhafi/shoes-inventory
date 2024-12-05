const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getAllShoes);
inventoryRouter.get("/edit/:id", inventoryController.editShoeGet);
inventoryRouter.post("/edit/:id", inventoryController.editShoePost);

module.exports = inventoryRouter;
