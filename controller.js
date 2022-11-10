const { selectTreasures } = require("./model");

exports.getTreasures = (req, res) => {
  selectTreasures().then((treasures) => {
    res.status(200).send({ treasures });
  });
};
