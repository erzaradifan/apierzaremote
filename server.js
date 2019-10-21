//var express = require('express'),
//    app = express(),
//    port = process.env.PORT || 3000,
//    bodyParser = require('body-parser'),
//    controller = require('./controller');
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const controller = require('./controller')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Learn Node JS With Kiddy Erza Radifan Rahmat test add, RESTful API server started on: ' + port);