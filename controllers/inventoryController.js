const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const adminPassword = "123";

const validateShoe = [
  body("gender")
    .trim()
    .isIn(["Man", "Woman", "Child"])
    .withMessage("Gender should be Man, Woman or Child"),

  body("type")
    .trim()
    .isIn(["Sport", "Classic", "Flipflop"])
    .withMessage("Type should be Sport, Classic or Flipflop"),

  body("size")
    .trim()
    .custom((value, { req }) => {
      if (req.body.gender === "Man") {
        if (value < 40 || value > 50) {
          throw new Error("Size for men should be between 40 to 50");
        }
      } else if (req.body.gender === "Woman") {
        if (value < 36 || value > 40) {
          throw new Error("Size for women should be between 36 to 40");
        }
      } else {
        if (value < 20 || value > 35) {
          throw new Error("Size for children should be between 20 to 35");
        }
      }

      return true;
    }),

  body("price")
    .trim()
    .isNumeric()
    .withMessage("Price should be a valid number"),
];

async function getAllShoes(req, res) {
  const shoes = await db.getAllShoes();
  res.render("index", { shoes });
}

async function editShoeGet(req, res) {
  const shoe = await db.getShoe(req.params.id);
  res.render("edit", { shoe: shoe[0] });
}

async function editShoePost(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).render("edit", {
      shoe: { ...req.body, id: req.params.id },
      errors: result.errors[0],
    });
  }

  const shoeBody = req.body;
  await db.editShoe(
    req.params.id,
    shoeBody.gender,
    shoeBody.type,
    shoeBody.size,
    shoeBody.price
  );
  res.redirect("/");
}

async function deleteShoeGet(req, res) {
  await db.deleteShoe(req.params.id);
  res.redirect("/");
}

async function addShoeGet(req, res) {
  res.render("add");
}

async function addShoePost(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).render("add", {
      shoe: { ...req.body, id: req.params.id },
      errors: result.errors[0],
    });
  }

  const shoeBody = req.body;
  await db.addShoe(
    shoeBody.gender,
    shoeBody.type,
    shoeBody.size,
    shoeBody.price
  );
  res.redirect("/");
}

async function isAdmin(req, res) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  const isAdmin = password === adminPassword;

  res.json({ isAdmin });
}

module.exports = {
  getAllShoes,
  editShoeGet,
  editShoePost: [validateShoe, editShoePost],
  deleteShoeGet,
  addShoeGet,
  addShoePost: [validateShoe, addShoePost],
  isAdmin,
};
