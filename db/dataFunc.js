
exports.formatTreasures = (shop, treasureArr) => {
    const changedTreasures = [];
    const shopIDObj = {};
    for(let i=0; i < shop.rows.length; i++){
        shopIDObj[shop.rows[i].shop_name] = shop.rows[i].shop_id;
    }
    for (let i = 0; i < treasureArr.length; i++) {
      changedTreasures.push({ ...treasureArr[i] });
      changedTreasures[i].shop_id = shopIDObj[treasureArr[i].shop];
      delete changedTreasures[i].shop;
    }
   
    return changedTreasures;
  };