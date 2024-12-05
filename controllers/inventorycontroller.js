const db = require("../db/queries");

async function getAllShoes(req, res) {
  const shoes = await db.getAllShoes();
  res.render("index", { shoes });
}

module.exports = { getAllShoes };
