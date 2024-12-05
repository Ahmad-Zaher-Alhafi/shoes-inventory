const express = require("express");
const inventoryRouter = require("./routes/inventoryRouter");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use("/", inventoryRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening to https:localhost:${PORT}`);
});
