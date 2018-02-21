var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var sensorLib = require("node-dht-sensor");
var firebase = require("firebase");
var firebase_config = require("./Config/Firebase");
//var mongoose = require("mongoose");
//var DataPoint = require('./Models/DataPoint');

var app = express();

app.use(bodyParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
//mongoose.connect('mongodb://localhost/sensordata');

router.get('/data/all', function(req,res) {
    DataPoint.find({}, function (err,data) {
        if(err) {
            console.log('ERROR GETTING DATA', err);
        }
        res.send(data);
    })
})

var sensor = {
    sensors: [  {
        name: "Indoor",
        type: 22,
        pin: 4
    } ],
    read: function() {
        for (var a in this.sensors) {
            var b = sensorLib.read(this.sensors[a].type, this.sensors[a].pin);
            console.log(this.sensors[a].name + ": " +
              b.temperature.toFixed(2) + "°C, " +
              b.humidity.toFixed(2) + "%");

            var datapoint = new DataPoint({
                temperature_c: b.temperature.toFixed(2),
                humidity_percent: b.humidity.toFixed(2),
            });

            datapoint.save(function(err,data){
                if(err){
                    console.log('ERROR IN SAVING TO MONGODB', err);
                }
                res.send(data);
            })
        }
        setTimeout(function() {
            sensor.read();
        }, 10000);
    }
};
 
sensor.read();


app.listen(8080, function(){
    console.log('Magic is happening on port 8080');
})