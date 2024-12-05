const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getAllShoes);
inventoryRouter.get("/edit/:id", inventoryController.editShoeGet);
inventoryRouter.post("/edit/:id", inventoryController.editShoePost);
inventoryRouter.get("/delete/:id", inventoryController.deleteShoeGet);
inventoryRouter.get("/add", inventoryController.addShoeGet);
inventoryRouter.post("/add", inventoryController.addShoePost);
inventoryRouter.post("/isAdmin", inventoryController.isAdmin);

module.exports = inventoryRouter;
