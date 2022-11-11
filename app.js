const express = require("express");
const { getTreasures, postTreasures } = require("./controller");

const app = express();
app.use(express.json());

app.get("/api/treasures", getTreasures);

app.post("/api/treasures", postTreasures);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
});

module.exports = app;
