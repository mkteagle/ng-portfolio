var blogs = [];
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');
var ObjectId = require('mongodb').ObjectID;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/doingutahdaily';
//var url = 'mongodb://mkteagle:Password01@ds011231.mlab.com:11231/doingutahdaily';
app.use('/', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/api', router);
var port = (process.env.PORT || 3000);
var passport = require('passport');

// This is the file we created in step 2.
// This will configure Passport to use Auth0
var strategy = require('./setup-passport');

// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: 'YOUR_SECRET_HERE', resave: false,  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
    function(req, res) {
        if (!req.user) {
            throw new Error('user null');
        }
        res.redirect("/user");
    });

function insertDocument(db, blog, callback) {
    db.collection('blogs').insertOne(blog, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the blogs collection.");
        callback();
    });
}
function findBlogs(db, callback) {
    var cursor = db.collection('blogs').find();
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            blogs.push(doc);
        }
        else {
            console.log(blogs);
            callback();
        }
    })
}
function updateComment(db, blog, callback) {
    blog._id = new ObjectId(blog._id);
    db.collection('blogs').replaceOne(
        { _id : blog._id }, blog,
        function(err, results) {
            if (err) throw err;
            console.log('Updated Record');
            callback();
        });
}
function updatePost(db, blog, callback) {
    // blog._id = new ObjectId(blog._id);
    db.collection('blogs').replaceOne(
        { _id : blog._id }, blog,
        function(err, results) {
            if (err) throw err;
            console.log('Updated Record');
            callback();
        });
}
function insertAdmin(db, user, callback) {
    db.collection('users').insertOne(user, function (err, result) {
        assert.equal(err, null);
        console.log('Inserted a document into the users collection');
        callback();
    })
}
function checkforDuplicates(db, user, callback) {
    db.collection('users').findOne({'_id': user}, function (err, result) {
        console.log(result);
        assert.equal(err, null);
        var foundUser = false;
        if (result != undefined || result != null) {
            foundUser = true;
            console.log('User Found!!');
            console.log(result);
        }
        var user = result;
        console.log(user);
        callback(foundUser, user);
    })
}
MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    findBlogs(db, function () {
        // db.close();
    });
});
router.route('/getPosts')
    .get(function(req, res) {
        blogs = [];
        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            findBlogs(db, function () {
                db.close();
                res.json(blogs);
            });
        });
    });
router.route('/addPost')
    .post(function(req, res) {
        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            insertDocument(db, req.body, function() {
                db.close();
            });
        });
        blogs.push(req.body);
        res.json(blogs);
    });
router.route('/updatePost')
    .put(function(req, res) {
        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            updatePost(db, req.body, function() {
                db.close();
                res.end();
            });
        });

    });
router.route('/comment')
    .put(function(req, res) {
        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            updateComment(db, req.body, function() {
                db.close();
            });
        });
        res.json(blogs);
    });
app.listen(port, function() {
    console.log(`App listening on port ${port}...`);
});
