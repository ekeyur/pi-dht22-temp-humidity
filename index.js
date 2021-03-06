var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var sensorLib = require("node-dht-sensor");
var firebase = require("firebase");
var firebase_config = require("./Config/Firebase");
var mongoose = require("mongoose");
var DataPoint = require('./Models/DataPoint');

var app = express();

app.use(bodyParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost/sensordata');

firebase.initializeApp(firebase_config);

router.get('/data/all', function(req,res) {
    
})

var sensor = {
    sensors: [  {
        name: "Keyur's Window Outside",
        type: 22,
        pin: 4
    } ],
    read: function() {
        for (var a in this.sensors) {
            var b = sensorLib.read(this.sensors[a].type, this.sensors[a].pin);
            var datapoint = {
                temperature_c: b.temperature.toFixed(2),
                humidity_percent: b.humidity.toFixed(2),
                date: Date.now(),
            }
            var Point = DataPoint(datapoint);
            // Point.save(function(err,data){
            //     if(err) throw err;
            //     console.log('Point Created', data);
            // })

            firebase.database().ref('/thsensor').push(datapoint);
        }
        setTimeout(function() {
            sensor.read();
        }, 14400000);
    }
};
 
sensor.read();

app.listen(8080, function(){
    console.log('Magic is happening on port 8080');
})