(function () {
    var express = require('express');
	var firebase = require("firebase");
    var app = express();
    var bodyParser = require('body-parser');
    var nodemailer = require('nodemailer');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/', express.static(__dirname + '/'));
    app.use('/donutclicker', express.static(__dirname + '/donutclicker'));
    app.use('/blog', express.static(__dirname + '/blog'));
	app.use('/register', express.static(__dirname + '/register'));
    app.use('/flappy', express.static(__dirname + '/flappy'));
    app.use('/login', express.static(__dirname + '/login'));
    app.use('/', express.static(__dirname));
    var port = (process.env.PORT || 5000);

	var config = {
		apiKey: "AIzaSyAjNim1Q6pCYGjnuLJnwyxfPSGR9mjULNg",
		authDomain: "mkteagle-29e04.firebaseapp.com",
		databaseURL: "https://mkteagle-29e04.firebaseio.com",
		storageBucket: "mkteagle-29e04.appspot.com"
	};
	firebase.initializeApp(config);


    app.post('/api/contact', function (req, res) {

    });
	app.post('/api/register', function(req, res) {
		firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
			if (error) throw error;
			else {
				console.log('Successfully created user');
				res.send('Successfully Created User');
			}
		});
	});
	app.post('/api/login', function(req, res) {
		firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
			.then(function(response) {
				res.send(response);
			})
			.catch(function(error) {
				if (error) {
					res.send(error);
				}
			});
	});
	app.post('/api/logout', function(req, res) {
		firebase.auth().signOut().then(function() {
			console.log("Successfully Signed Out");
			// Sign-out successful.
		}, function(error) {
			if (error) throw error;
			// An error happened.
		});
	});
	app.post('/api/updateUser', function(req, res) {
		firebase.database().ref('users/' + req.body.uid).set({
			username: req.body.email,
			uid : req.body.uid
		});
		res.send("All Done Successfully");
	});
	app.post('/api/addPost', function(req, res) {

	});
	app.get('/api/all', function(req, res) {

	});
	app.delete('/api/delete', function(req, res) {

	});
	app.post('/api/update', function(req, res) {

	});





// create reusable transporter object using the default SMTP transport


    app.post('/api/postEmail', function (req, res) {
        var transporter = nodemailer.createTransport('smtps://sayhellomkteagle%40gmail.com:saysomething@smtp.gmail.com');
        var mailOptions = {
            from: '"Site Email 👥" <' + req.body.email + '>', // sender address
            to: 'sayhello@mkteagle.com', // list of receivers
            subject: 'Hello from ' + req.body.name, // Subject line
            text: 'Message: ' + req.body.content + "<br/> email: " + req.body.email
        };

// send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });


        res.send(true);
    });
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });
	app.listen(port, function () {
		console.log(`App listening on port ${port}...`);
	});
})();
