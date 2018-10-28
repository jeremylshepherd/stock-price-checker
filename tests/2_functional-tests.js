/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

'use strict';

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const Stock = require('../models/Stocks');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite('GET /api/stock-prices => stockData object', function() {
        test('1 stock', function(done) {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: 'goog' })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.stockData.stock, 'GOOG');
                    assert.equal(res.body.stockData.likes, 0);
                    assert.property(res.body, 'stockData');
                    assert.property(res.body.stockData, 'stock');
                    assert.property(res.body.stockData, 'likes');
                    assert.property(res.body.stockData, 'price');
                    done();
                });
        });

        test('1 stock with like', function(done) {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: 'goog', like: true })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.stockData.stock, 'GOOG');
                    assert.equal(res.body.stockData.likes, 1);
                    assert.property(res.body, 'stockData');
                    assert.property(res.body.stockData, 'stock');
                    assert.property(res.body.stockData, 'likes');
                    assert.property(res.body.stockData, 'price');
                    done();
                });
        });

        test('1 stock with like again (ensure likes arent double counted)', function(done) {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: 'goog', like: true })
                .end(function(err, parRes) {
                    chai.request(server)
                        .get('/api/stock-prices')
                        .query({ stock: 'goog', like: true })
                        .end(function(err, res) {
                            assert.equal(res.status, 200);
                            assert.equal(res.body.stockData.stock, 'GOOG');
                            assert.equal(res.body.stockData.likes, 1);
                            assert.property(res.body, 'stockData');
                            assert.property(res.body.stockData, 'stock');
                            assert.property(res.body.stockData, 'likes');
                            assert.property(res.body.stockData, 'price');
                            done();
                        });
                });
        });

        test('2 stocks', function(done) {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: ['goog', 'msft'] })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.stockData[0].stock, 'GOOG');
                    assert.equal(res.body.stockData[0].rel_likes, 0);
                    assert.equal(res.body.stockData[1].stock, 'MSFT');
                    assert.equal(res.body.stockData[1].rel_likes, 0);
                    assert.property(res.body, 'stockData');
                    assert.isArray(res.body.stockData);
                    assert.property(res.body.stockData[0], 'stock');
                    assert.property(res.body.stockData[0], 'rel_likes');
                    assert.property(res.body.stockData[0], 'price');
                    assert.property(res.body.stockData[1], 'stock');
                    assert.property(res.body.stockData[1], 'rel_likes');
                    assert.property(res.body.stockData[1], 'price');
                    done();
                });
        });

        test('2 stocks with like', function(done) {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: ['goog', 'msft'], like: true })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.stockData[0].stock, 'GOOG');
                    assert.equal(res.body.stockData[0].rel_likes, 0);
                    assert.equal(res.body.stockData[1].stock, 'MSFT');
                    assert.equal(res.body.stockData[1].rel_likes, 0);
                    assert.property(res.body, 'stockData');
                    assert.isArray(res.body.stockData);
                    assert.property(res.body.stockData[0], 'stock');
                    assert.property(res.body.stockData[0], 'rel_likes');
                    assert.property(res.body.stockData[0], 'price');
                    assert.property(res.body.stockData[1], 'stock');
                    assert.property(res.body.stockData[1], 'rel_likes');
                    assert.property(res.body.stockData[1], 'price');
                    done();
                });
        });

        suiteSetup(() => {
            Stock.find().remove(err => {
                if (err) throw new Error(err);
                console.log('Collection dropped');
            });
        });

        teardown(() => {
            Stock.find().remove(err => {
                if (err) throw new Error(err);
                console.log('Collection dropped');
            });
        });
    });
});
