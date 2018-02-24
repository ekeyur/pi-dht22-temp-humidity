var mongoose = require("mongoose");

var Schema = mongoose.Schema

var DataPointSchema = new Schema({
    temperature_c: Number,
    humidity_percent: Number,
    created_at: Date,
});

var DataPoint = mongoose.model('DataPoint', DataPointSchema);

module.exports = DataPoint;