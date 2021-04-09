var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Router Import and app execution
var people = require('./routes/people.js');
app.use('/', people);

app.listen(3000);