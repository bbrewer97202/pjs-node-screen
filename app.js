var express = require('express');
var app = module.exports = express.createServer();
var exec = require('child_process').exec;

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
	
	//todo: error handling
	var url = req.param('url');
	var id = process.pid + new Date().getTime();
	var outFile = "public/tmp/" + id + ".png";

	var child = exec('phantomjs render.js ' +  url + ' ' + outFile, 
	  function (error, stdout, stderr) {
	    if (error === null) {		
				res.render('results', {	 	
					url: url,
					id: id
				});
			} else {
				//todo: error handling
	      console.log('exec error: ' + error);
	    }
	});
});

app.listen(3000);
