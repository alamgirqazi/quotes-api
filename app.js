// Get dependencies
const express = require("express");
const http = require("http");

const app = express();
const mongoose = require("mongoose");
const Quotes = require("./models/quotes.js");
const allQuotes = require('./quotes.js');
require('now-env');

mongoose.connect(`${process.env.MONGO_DEV}`,{ useNewUrlParser: true });

const port = "3000";

app.set("port", port);

const server = http.createServer(app);

app.get('/get-quotes-from-file',  function (req, res) {
  const data = {};
  data.status =200;
  data.message = "All Quotes retrieved from File";
  data.data = allQuotes;

  res.status(200).send(
    data);
});

app.get("/get-all-quotes", function(req, res) {
  Quotes.find({})
    .exec(function(err, quotes) {
      if(err){
        res.send(err);
      }
      const data = {};
      data.status =200;
      data.message = "All Quotes retrieved";
      data.data = quotes;
      res.send(data);
    });
});

// GET Single Quote
app.get("/", function(req, res) {
  Quotes.find({})
    .exec(function(err, quotes) {
      if(err){
        res.send(err);
      }
      const data = {};
      data.status =200;
      data.message = "1 Quote retrieved";
      const item = quotes[Math.floor(Math.random()*quotes.length)];

      data.data = item;
      res.send(data);
    });
});

// ADD Quotes to Database 

// app.post("/addquote", function(req, res) {

// allQuotes.forEach(quote => {
//   var quoteToSave = new Quotes(quote);  

//   quoteToSave.save(function(err) {
//     if (err) {
//       console.log(err);
//     }
//   });
// });

//     res.send('done').status(200);

// });

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));