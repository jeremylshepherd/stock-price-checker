module.exports = function(r) {
  if(r['Note']) {
    return {
      stock: 'GOOG',
      price: '0.01',
      warning: 'API Limit exceeded; dummy data provided instead'
    };
  }
  let stock = r["Meta Data"]["2. Symbol"];
  let data = r["Time Series (15min)"];
  let timeKeys = Object.keys(data);
  let price = data[timeKeys[0]]["4. close"];
  price = parseFloat(price).toFixed(2);
  let obj = {
    stock,
    price
  };
  return obj;
};