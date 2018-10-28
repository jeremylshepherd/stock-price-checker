/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const getStocks = require('../controllers/getStocks');

module.exports = function (app) {
  
  app.route('/api/stock-prices')
    .get(function (req, res){
      getStocks(req, res);
    });    
};
