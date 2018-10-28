'use strict'

const request = require('request');
const reformat = require('./reformat');

module.exports = function(data, fn) {
  console.log(`getStockPrice: ${JSON.stringify(data, null, 2)}`);
  const options = {  
      url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${data.stock}&interval=15min&apikey=${process.env.API_KEY}`,
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8'
      }
  };
  request(options, function(err, res, body) {
      if(err) {fn(err, null);}
      let retData = JSON.parse(body);
      let simpleData = reformat(retData);
      let { stock, ...rest } = simpleData;
      fn(null, {...data, ...rest });
  });
};