const { selectTreasures } = require("./model");

exports.getTreasures = (req, res) => {
  const { sort_by } = req.query;
  const orderDirection = req.query.order;
  console.log({ sort_by, orderDirection });
  selectTreasures(sort_by, orderDirection).then((treasures) => {
    res.status(200).send({ treasures });
  });
};
