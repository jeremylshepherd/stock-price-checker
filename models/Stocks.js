const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    stock: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedIPS: [String]
});

module.exports = mongoose.model('Stock', StockSchema);
