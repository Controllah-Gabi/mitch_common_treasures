const db = require("./db");

exports.selectTreasures = (sort_by = "age", orderDirection = "ASC") => {
  const validDirections = ["ASC", "desc", "asc", "DESC"];
  const validColumns = ["age", "cost_at_auction", "treasure_name"];
  if (
    !validColumns.includes(sort_by) ||
    !validDirections.includes(orderDirection)
  ) {
    return Promise.reject({ status: 400, msg: "invalid sort query" });
  }
  return db
    .query(
      `SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name FROM treasures JOIN shops ON shops.shop_id = treasures.shop_id ORDER BY treasures.${sort_by} ${orderDirection.toUpperCase()};`
    )
    .then((data) => {
      return data.rows;
    });
};
