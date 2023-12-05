const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/user.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

console.log(process.env.GOOGLE_OAUTH_CLIENT_ID);
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
			callbackURL: 'http://localhost:8000/api/v1/auth/google/callback',
			scope: ['profile', 'email'],
		},
		async function (accessToken, refreshToken, profile, callback) {
			console.log('🚀 ~ file: passport.js:19 ~ profile:', profile);

			try {
				let user = await User.findOne({ oAuthId: profile.id });

				if (!user) {
					const { _json } = profile;
					user = await User.create({
						oAuthId: profile.id,
						firstName: _json.given_name,
						lastName: _json.family_name,
						email: _json.email,
						oAuthProvider: profile.provider,
					});
				}

				return callback(null, user);
			} catch (error) {
				return callback(error);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
