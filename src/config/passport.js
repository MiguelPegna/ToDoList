const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy(
    {usernameField: 'email'}, async(email, password, done)=>{
        const user = await User.findOne({email: email});
        if(!user){
            return done(null, false, {message: 'email o password incorrectos'});
        }
        else{
            const match = await user.matchPassword(password);
            if(match){
                return done(null, user);
            }
            else{
                return done(null, false, {message: 'email o password incorrectos'});
            }
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
	try {
        const userId = await User.findById(id).lean();
        if(!userId) throw new Error('User not found');
        done(null, userId);
    } catch (err) {
        done(err, null);
    }
});