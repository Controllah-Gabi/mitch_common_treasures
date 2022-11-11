const { selectTreasures } = require("./model");

exports.getTreasures = (req, res) => {
  const {sort_by} = req.query;
  console.log(req.query)
  selectTreasures(sort_by).then((treasures) => {
    res.status(200).send({ treasures });
  });
};

