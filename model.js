const { filter } = require("lodash");
const db = require("./db");

exports.selectTreasures = (sort_by = "age", orderDirection = "ASC", filterQuery) => {
  const validDirections = ["ASC", "desc", "asc", "DESC"];
  const validColumns = ["age", "cost_at_auction", "treasure_name"];
  if (
    !validColumns.includes(sort_by) ||
    !validDirections.includes(orderDirection)
    ) {
      return Promise.reject({ status: 400, msg: "invalid sort query" });
    }
    
    let queryStr = `SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name FROM treasures JOIN shops ON shops.shop_id = treasures.shop_id`
    if(filterQuery !== undefined){
      queryStr+=` WHERE colour = $1`
      console.log("we made it to a kinda end")
  }
  queryStr += ` ORDER BY treasures.${sort_by} ${orderDirection.toUpperCase()};`
  return db
    .query(
      queryStr,[filterQuery]
    )
    .then((data) => {
      return data.rows;
    });
};
