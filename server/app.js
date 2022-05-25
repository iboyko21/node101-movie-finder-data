const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
require('dotenv').config();
// console.log(process.env); 

const app = express();

// Server should log each request using morgan's dev format
app.use(morgan('dev'));

var requestCount = 0;
app.use(function(req, res, next) {
    requestCount++;
    console.log('Request number: ' + requestCount);
    next();
});

const api_key = process.env.API_KEY;
const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${api_key}`;


// Server should respond to GET requests to /?i=tt3896198 with movie data
app.get('/', function(req, res) {
    // res.status(200).send('This is the / route'); 
    axios.get(url)
    // .then(response => res.json(response.data));
    .then(function (response) {
        res.json(response.data);

        console.log("Response.data: " + response.data); 
        console.log("Res: " + res); 
    });
});

module.exports = app;