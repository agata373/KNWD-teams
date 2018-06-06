const keys = require('../../config/keys');

module.exports = User => ({
  config: {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
  },
  callback: async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    const user = existingUser || (await new User({ googleId: profile.id }).save());

    return done(null, user);
  },
});
