const express = require("express");
const { getTreasures } = require("./controller");

const app = express();
app.use(express.json());

app.get("/api/treasures", getTreasures);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
