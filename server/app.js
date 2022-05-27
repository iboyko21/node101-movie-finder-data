const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
// Server should log each request using morgan's dev format
app.use(morgan('dev'));

var requestCount = 0;
app.use(function(req, res, next) {
    requestCount++;
    console.log('Request number: ' + requestCount);
    next();
});

const key = process.env.API_KEY;
// Server should respond to GET requests to /?i=tt3896198 with movie data
// Server should respond to GET requests to /?t=baby%20driver with movie data
// Server should respond to GET requests with movie data, without fetching from the OMDb API
let movieData = [];
app.get('/', function(req, res) {
    // check if incomming id or title already exist inside movieData array
        // check by ID
    if (req.query.hasOwnProperty('i')){ 
        let index = movieData.findIndex(element => {
            if (element.imdbID === req.query.i) {
              return true;
            }
            return false;
          });

          if (index != -1){
              res.status(200).send(movieData[index]);
              return;
          } else {
                let id = req.url;
                let url = `http://www.omdbapi.com/${id}&apikey=${key}`;
                axios.get(url)
                .then(function (movie) {
                    res.status(200).send(movie.data);
                    movieData.push(movie.data);
                    return;
                });
          }
          // check by title
    } else if (req.query.hasOwnProperty('t')){ 
        let index = movieData.findIndex(element => {
            if ((element.Title).toLowerCase() === req.query.t) {
              return true;
            }
            return false;
          });

          if (index != -1){
            res.status(200).send(movieData[index]);
              return;
          } else {
                let id = req.url;
                let url = `http://www.omdbapi.com/${id}&apikey=${key}`;
                axios.get(url)
                .then(function (movie) {
                    res.status(200).send(movie.data);
                    movieData.push(movie.data);
                    return;
                });
          }
    }
});
    
module.exports = app;