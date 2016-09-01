(function(){
	var express = require('express');
	var app = express();
	var bodyParser = require('body-parser');
	var nodemailer = require('nodemailer');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use('/', express.static(__dirname + '/'));
	app.use('/donutclicker', express.static(__dirname + '/donutclicker'));
	app.use('/', express.static(__dirname));
	var port = (process.env.PORT || 5000);

	app.post('/api/contact', function(req, res){

	});

	app.listen(port, function() {
		console.log(`App listening on port ${port}...`);
	});


// create reusable transporter object using the default SMTP transport


	app.post('/api/postEmail', function(req, res){
		var transporter = nodemailer.createTransport('smtps://sayhellomkteagle%40gmail.com:saysomething@smtp.gmail.com');
		var mailOptions = {
			from: '"Site Email 👥" <'+ req.body.email + '>', // sender address
			to: 'sayhello@mkteagle.com', // list of receivers
			subject: 'Hello from ' + req.body.name, // Subject line
			text: 'Message: ' + req.body.content + "<br/> email: " + req.body.email
		};

// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				return console.log(error);
			}
			console.log('Message sent: ' + info.response);
		});


	res.send(true);
});
app.get('*', function (req, res){
	res.sendFile(__dirname + '/index.html');
});


})();
