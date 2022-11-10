const db = require("./");
const { shopData, treasureData } = require("./data/test-data/index");

const seed = (shopData, treasureData) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS shops`);
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
      return db.query(`CREATE TABLE treasures (
			treasure_id SERIAL PRIMARY KEY,
			treasure_name VARCHAR(40),
			colour VARCHAR(40),
			age INT,
			cost_at_auction FLOAT,
			shop_id INT REFERENCES shops(shop_id)
		);`);
    })
    .then(() => {
      console.log(shopData);
      const queryStr = format(
        `INSERT INTO shops
        		(shop_name, owner, slogan)
        		VALUES
        		%L
        		RETURNING *;`
      );
    });
  // then: create some new tables - but which first and why?
  // then: insert the raw data into the tables.
};

seed();
module.exports = seed;
