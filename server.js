var express = require("express");
var path = require("path");
var bp = require("body-parser");
var fs = require("fs");

var app = express();

app.use(express.static(path.join(__dirname, "static")));
app.use(bp.urlencoded({extended: true}));
app.set("view engine", "pug");

app.get("/mcs", function(req, res) {
  // returns all rappers
  var mcs = fs.readFileSync("data.json");
  mcs = JSON.parse(mcs);
  res.json(mcs);
});

app.get("/mcs/:id", function(req, res) {
  // returns all rappers
  var mcs = fs.readFileSync("data.json");
  mcs = JSON.parse(mcs);
  var mcIndex = req.params.id;
    res.send({mcs: mcs[mcIndex] });
});

app.put("/mcs/:id", function(req, res) {
  // returns all rappers
  var mcs = fs.readFileSync("data.json");
  mcs = JSON.parse(mcs);
  var mcIndex = req.params.id;
  var mcName = req.body.name;
  var mcAlbums = req.body.albums;
  mcs.splice(mcIndex, 1, {name: mcName, albums: mcAlbums} );
  fs.writeFileSync("./data.json", JSON.stringify(mcs));
  res.json(mcs);
});


app.delete("/mcs/:id", function(req, res) {
  // adds a new rapper
  var mcs = fs.readFileSync("./data.json");
  mcs = JSON.parse(mcs);
  var mcIndex = req.params.id;
  mcs.splice(mcIndex, 1);
  fs.writeFileSync("./data.json", JSON.stringify(mcs));
  res.json(mcs);
});

app.post("/mcs", function(req, res) {
  // adds a new rapper
  var mcs = fs.readFileSync("./data.json");
  mcs = JSON.parse(mcs);
  mcs.push({
    name: req.body.name,
    albums: req.body.albums
  });
  fs.writeFileSync("./data.json", JSON.stringify(mcs));
  res.json(mcs);
});


app.listen(process.env.PORT || 3000);
