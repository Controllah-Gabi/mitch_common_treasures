const { selectTreasures, insertTreasure, selectTreasuresByID } = require("./model");

exports.getTreasures = (req, res, next) => {
  const { sort_by } = req.query;
  const orderDirection = req.query.order;
  const colourFilter = req.query.colour;
  selectTreasures(sort_by, orderDirection, colourFilter)
    .then((treasures) => {
      res.status(200).send({ treasures });
    })
    .catch((err) => {
      next(err);
    });
};
exports.postTreasures = (req, res, next) => {
  const body = req.body;
  insertTreasure(body).then((treasures) => {
    res.status(201).send({ treasures });
  }).catch((err)=>{
    console.log(err.code)
    next(err);
  });
};

exports.getTreasuresByID = (req,res,next) =>{
  selectTreasuresByID(req.params.treasure_id).then((data)=>{
    res.status(200).send(data)
  })
}