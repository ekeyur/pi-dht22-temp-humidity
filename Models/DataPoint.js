var mongoose = require("mongoose");

var Schema = mongoose.Schema
var DataPoint = new Schema({
    temperature_c: Number,
    humidity_percent: Number,
})

module.exports = DataPoint;