const express = require("express");
const { getTreasures, postTreasures,getTreasuresByID } = require("./controller");

const app = express();
app.use(express.json());

app.get("/api/treasures", getTreasures);
app.get("/api/treasures/:treasure_id", getTreasuresByID);

app.post("/api/treasures", postTreasures);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  if(err.code === '22P02'){
    res.status(400).send({msg: "Invalid data type"})
  }else{
  res.status(err.status).send({ msg: err.msg });
  next()}
});

module.exports = app;
