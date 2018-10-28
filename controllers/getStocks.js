const Stock = require('../models/Stocks');
const getStockPrice = require('./getStockPrice');
const compareLikes = require('./compareLikes');

module.exports = function(req, res) {
    let sym1 = req.query.stock;
    let sym2;
    let ip = req.ip;

    if (Array.isArray(req.query.stock)) {
        sym1 = req.query.stock[0]; //re-assigns if req.query.stock is an Array
        sym2 = req.query.stock[1].toUpperCase();
    }
    sym1 = sym1.toUpperCase();
    Stock.findOne({ stock: sym1 }, (err1, stock1) => {
        if (err1) return err1;

        if (!stock1) {
            stock1 = new Stock({ stock: sym1, likes: 0, likedIPS: [] });
        }

        let like = false;
        if (stock1.likedIPS.indexOf(ip) === -1) like = req.query.like ? true : false;
        if (like) {
            stock1.likes += 1;
            stock1.likedIPS.push(ip);
        }
        stock1.save((saveErr1, record1) => {
            if (saveErr1) return saveErr1;

            if (sym2 === undefined) {
                let done = (err, data) => {
                    if (err) return err;
                    res.json({ stockData: data });
                };

                let obj = {};
                obj.stock = stock1.stock;
                obj.likes = stock1.likes;
                getStockPrice(obj, done);
            } else {
                Stock.findOne({ stock: sym2 }, (err2, stock2) => {
                    if (err2) return err2;

                    if (!stock2) {
                        stock2 = new Stock({ stock: sym2, likes: 0, likedIPS: [] });
                    }

                    like = false;
                    if (stock2.likedIPS.indexOf(ip) === -1) like = req.query.like ? true : false;
                    if (like) {
                        stock2.likes += 1;
                        stock2.likedIPS.push(ip);
                    }
                    stock2.save((saveErr2, record2) => {
                        if (saveErr2) return saveErr2;
                        compareLikes([record1, record2], res);
                    });
                });
            }
        });
    });
};
