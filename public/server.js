(function(){
	var express = require('express');
	var app = express();
	var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use('/', express.static(__dirname + '/'));
	app.use('/', express.static(__dirname));
	var port = (process.env.PORT || 5000);

	var firebase = require("firebase");
	// firebase.initializeApp({
	// 	serviceAccount: "app/assets/doingutahdaily-07027debc6a3.json",
	// 	databaseURL: "https://doingutahdaily.firebaseio.com"
	// });
	app.post('/api/contact', function(req, res){

	});

	app.listen(port, function() {
		console.log(`App listening on port ${port}...`);
	});


})();
