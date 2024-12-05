const db = require("../db/queries");
const { body, validationRedult } = require("express-validator");

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
        if (value < 20 || value > 36) {
          throw new Error("Size for men should be between 20 to 36");
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

async function getShoe(req, res) {
  const shoe = await db.getShoe(req.params.id);
  res.render("edit", { shoe: shoe[0] });
}

async function editShoe(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("createUser", {
      title: "Create user",
      errors: errors.array(),
    });
  }

  const shoe = await db.getShoe(req.body.id);
  res.render("edit", { shoe });
}

module.exports = { getAllShoes, getShoe, editShoe: [validateShoe, editShoe] };
