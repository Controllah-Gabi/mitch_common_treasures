const db = require("./");

const format = require("pg-format")
const seed = ({shopData, treasureData}) => {
  
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS shops;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE shops (
			shop_id SERIAL PRIMARY KEY,
			shop_name VARCHAR(20) NOT NULL, 
			owner VARCHAR(40) NOT NULL,
			slogan TEXT
		);`);
    })
    .then(() => {
      console.log("line 20")
      return db.query(`CREATE TABLE treasures (
        treasure_id SERIAL PRIMARY KEY,
        treasure_name VARCHAR(40),
        colour VARCHAR(40),
        age INT,
        cost_at_auction FLOAT,
        treasureShop_id INT REFERENCES shops(shop_id)
        );`);
      })
      .then(() => {
        console.log("------------Before formatted shops")
      const formattedShops = shopData.map((shop) =>{
        return [
          shop.shop_name,
          shop.owner,
          shop.slogan,
        ];
      });
      console.log(formattedShops)
      const queryStr = format(
        `INSERT INTO shops
        		(shop_name, owner, slogan)
        		VALUES
        		%L
        		RETURNING *;`,formattedShops
      );
    });
  // then: create some new tables - but which first and why?
  // then: insert the raw data into the tables.
};


module.exports = seed;
