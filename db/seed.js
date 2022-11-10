const db = require("./");

const format = require("pg-format");
const { formatTreasures } = require("./dataFunc");

const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS shops;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE shops (
			shop_id SERIAL PRIMARY KEY,
			shop_name VARCHAR(40) NOT NULL, 
			owner VARCHAR(40) NOT NULL,
			slogan TEXT
		);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE treasures (
        treasure_id SERIAL PRIMARY KEY,
        treasure_name TEXT,
        colour TEXT,
        age INT,
        cost_at_auction FLOAT,
        shop_id INT REFERENCES shops(shop_id)
        );`);
    })
    .then(() => {
      const formattedShops = shopData.map((shop) => {
        return [shop.shop_name, shop.owner, shop.slogan];
      });

      const queryStr = format(
        `INSERT INTO shops
        		(shop_name, owner, slogan)
        		VALUES
        		%L
        		RETURNING *;`,
        formattedShops
      );
      return db.query(queryStr);
    })
    .then((data) => {
      const Treasures = formatTreasures(data,treasureData)
      const formattedTreasures = Treasures.map((treasureData)=>{
        return [treasureData.treasure_name, treasureData.colour, treasureData.age, treasureData.cost_at_auction, treasureData.shop_id]
      });

      
      // ----- formatTreasures(data,formattedtreasure)
      const queryStr = format(
        `
		INSERT INTO treasures (treasure_name,
		colour,
		age,
		cost_at_auction,
    shop_id)
		VALUES %L
		RETURNING *;`,
        formattedTreasures
      );
      return db.query(queryStr);
    })
    .then((data) => {
      console.log(data.rows);
    });
  // then: create some new tables - but which first and why?
  // then: insert the raw data into the tables.
};

module.exports = seed;
