const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./db/userModel');


exports.initializingpassword = (passport) => {
    passport.use(new LocalStrategy(
       async function (username, password, done) {
            const user1 = await User.findOne({ userName: username })
            console.log(user1);
            return done(null , user1)
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);

            done(null, user);
        } catch (error) {
            done(error, false);
        }
    });

};