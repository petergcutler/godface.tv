var express = require('express');
var app = express();
var port = parseInt(process.env.PORT, 10) || 8080;

app.use('/', express.static(__dirname + '/static/build'));

app.use(app.router);

app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('you are searching for god in all the wrong places.');
});

app.use(express.logger());

app.listen(port);
console.log('Listening on port ' + port);
