const aSink = require('async');
const getStockPrice = require('./getStockPrice');

module.exports = (arr, res) => {
  let a = arr[0].likes;
  let b = arr[1].likes;  
  
  let aRelLikes = a <= b ? a - b : (a - b) * -1;
  let bRelLikes = a >= b ? a - b : (a - b) * -1;
  
  arr[0].rel_likes = aRelLikes;
  arr[1].rel_likes = bRelLikes;
    
  let relArr = arr.map(a => {
    return {
      stock: a.stock,
      rel_likes: a.rel_likes
    };
  });
  
  let done = (err, results) => {
    if(err) return err;
    res.json({stockData: results});
  }
  
  aSink.concat(relArr, getStockPrice, done);
}