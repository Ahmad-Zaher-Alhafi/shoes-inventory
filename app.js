const express = require("express");
const inventoryRouter = require("./routes/inventoryRouter");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", inventoryRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening to https:localhost:${PORT}`);
});
