// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var c;
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


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
      if(req.params.date == undefined){
      return res.json({
    unix: new Date()*1,
    utc: new Date().toUTCString()
  })
  }
  // use req.params.date to successfully test out when parsing date
  let pathDate = req.params.date;
  if(parseInt(pathDate) === new Date(pathDate*1).getTime()){
  var date_string = new Date(parseInt(pathDate))*1
  var utc_string = new Date(pathDate * 1).getTime()
  }else{
  var date_string = new Date(pathDate)*1;
  var utc_string = new Date(pathDate);
  }
  var json = {
    unix: date_string,
    utc: new Date(utc_string).toUTCString()
  }
  if(json.utc == "Invalid Date"){
    json = {
      error: "Invalid Date"
    }
  }
  res.type('application/json').json(json);   
}); 

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
