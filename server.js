require('babel-register')
var express = require('express');
var webApp = express();
var path = require('path');
webApp.use(express.static('/'));

var appDir = path.dirname(require.main.filename);
 
webApp.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
})
 
webApp.listen(3000);
