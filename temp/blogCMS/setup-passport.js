var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       'teagleseagles.auth0.com',
    clientID:     'HgmQAsN454guxmXz8tsq951aM0rrfADL',
    clientSecret: 'OK5eIpbg4wZGaay2if8Ss8NlqbQuv_ds4KeM1DvDoN8ts2NytpzNxbJV-Ps0Wmv0',
    callbackURL:  '/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
});

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = strategy;