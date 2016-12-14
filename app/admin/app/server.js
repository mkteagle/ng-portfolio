(function () {
    var express = require('express');
	var admin = require("firebase-admin");
    var app = express();
	var firebase = require("firebase");
    var bodyParser = require('body-parser');
	var morgan      = require('morgan');
    var nodemailer = require('nodemailer');
	var jwt = require('jwt-simple');
	var FroalaEditor = require('../node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
	// log to console
	app.use(morgan('dev'));

    // app.use('/', express.static(__dirname + '/'));
	app.use('/uploads', express.static(__dirname + '/uploads'));
    app.use('/', express.static(__dirname));
    var port = (process.env.PORT || 5000);
	var apiRoutes = express.Router();
	var serviceAccount = require("./config/mkteagle.json");
	var config = {
		apiKey: "AIzaSyAjNim1Q6pCYGjnuLJnwyxfPSGR9mjULNg",
		authDomain: "mkteagle-29e04.firebaseapp.com",
		databaseURL: "https://mkteagle-29e04.firebaseio.com",
		storageBucket: "mkteagle-29e04.appspot.com"
	};
	firebase.initializeApp(config);

	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://mkteagle-29e04.firebaseio.com"
	});
	

    apiRoutes.post('/contact', function (req, res) {

    });
	apiRoutes.post('/locateUser', function(req, res) {
		admin.auth().getUser(req.body.uid)
			.then(function(userRecord) {
				// See the tables below for the contents of userRecord
				console.log("Successfully fetched user data:", userRecord.toJSON());
				res.send(userRecord.toJSON());
			})
			.catch(function(error) {
				console.log("Error fetching user data:", error);
			});
	});
	apiRoutes.post('/createUser', function(req, res) {
		admin.auth().createUser({
			email: req.body.email,
			emailVerified: false,
			password: req.body.password,
			displayName: req.body.displayName,
			disabled: false
		})
			.then(function(userRecord) {
				console.log("Successfully created new user:", userRecord.uid);
				res.send("Successfully created user");
			})
			.catch(function(error) {
				console.log("Error creating new user:", error);
				res.send(error);
			});
	});
	apiRoutes.post('/uploadImage', function(req, res) {
		FroalaEditor.Image.upload(req, '/uploads/', function(err, data) {
			if (err) {
				return res.send(JSON.stringify(err));
			}
			res.send(data);
		});
	});
	apiRoutes.post('/checkUser', function(req, res) {
		admin.auth().verifyIdToken(req.body.token)
			.then(function(decodedToken) {
				var uid = decodedToken.uid;
				res.send(uid);
			}).catch(function(error) {
		});

	});
	apiRoutes.post('/login', function(req, res) {
		firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
			.then(function(response) {
				firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
					res.send(idToken);
				}).catch(function(err) {
					if (err) throw err;
				});
			})
			.catch(function(error) {
				if (error) {
					res.send(error);
				}
			});
	});
	apiRoutes.post('/logout', function(req, res) {
		firebase.auth().signOut().then(function() {
		}, function(error) {
			if (error) throw error;
		});
	});
	apiRoutes.post('/adminUpdate', function(req, res) {
		admin.auth().updateUser(req.body.uid, {
			displayName: req.body.displayName,
		})
			.then(function(userRecord) {
				console.log("Successfully updated user", userRecord.toJSON());
				res.send("User updated!!")
			})
			.catch(function(error) {
				console.log("Error updating user:", error);
			});
	});
	apiRoutes.post('/updateUser', function(req, res) {
		firebase.database().ref('users/' + req.body.uid).set({
			username: req.body.email,
			uid : req.body.uid
		});
		res.send("All Done Successfully");
	});
	apiRoutes.post('/createBlog', function(req, res) {
		firebase.database().ref('blogs/' + req.body.uid).set({
			uid: req.body.uid,
			author: req.body.author,
			created: Date.now(),
			title: req.body.title,
			featuredImage: req.body.featuredImage,
			content: req.body.content,
			param: req.body.param,
			posted: req.body.posted,
			county: req.body.county
		});
		res.send("All Done Successfully");

	});
	apiRoutes.post('/all', function(req, res) {
		firebase.database().ref('blogs/').once('value').then(function(snapshot) {
			res.send(snapshot.val());
		}).catch(function(err) {
			if (err) throw err;
		})

	});
	apiRoutes.post('/deleteBlog', function(req, res) {
		var blog = firebase.database().ref('blogs/'+ req.body.uid);
		blog.remove().then(function(response) {
			res.send(response);
		}).catch(function(err) {
			if (err) throw err;
		})

	});
	apiRoutes.post('/updateBlog', function(req, res) {
		console.log(req.body);
        firebase.database().ref('blogs/' + req.body.uid).set({
        	uid: req.body.uid,
            author: req.body.author,
	        created: req.body.created,
            lastModified: Date.now(),
            title: req.body.title,
            featuredImage: req.body.featuredImage,
            content: req.body.content,
            param: req.body.param,
	        posted: req.body.posted,
	        county: req.body.county
        });
        res.send("All Done Successfully");
	});
	apiRoutes.post('/admin', function(req, res) {
		
	});
	apiRoutes.post('/forgot', function(req, res) {
		firebase.auth().sendPasswordResetEmail(req.body.email).then(function() {
			res.send('Email Sent');
		}, function(error) {
			// An error happened.
		});
	});
	apiRoutes.post('/uploadFeatured', function(req, res) {
        FroalaEditor.Image.upload(req, '/uploads/', function(err, data) {
            if (err) {
                return res.send(JSON.stringify(err));
            }
            res.send(data);
        });
	});




// create reusable transporter object using the default SMTP transport
    apiRoutes.post('/postEmail', function (req, res) {
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
	app.use('/api', apiRoutes);
	app.listen(port, function () {
		console.log(`App listening on port ${port}...`);
	});
})();
