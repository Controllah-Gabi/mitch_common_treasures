const db = require("./db");

exports.selectTreasures = () => {
  return db
    .query(
      "SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name FROM treasures JOIN shops ON shops.shop_id = treasures.shop_id ORDER BY treasures.age;"
    )
    .then((data) => {
      return data.rows;
    });
};
