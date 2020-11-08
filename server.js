// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const getTimestamp = strValue => {
  const value = strValue.toString().includes('-') ? strValue : parseInt(strValue);
  const date = new Date(value);
  
  if(date.toString() === 'Invalid Date') return { error: date.toString() }

  return {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
};


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/', (req, res) => {
  res.json(getTimestamp(Date.now()));
});

app.get('/api/timestamp/:date', (req, res) => {
  console.log(req.params.date);
  res.json(getTimestamp(req.params.date));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
