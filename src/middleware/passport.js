import passport from 'passport';
import User from '../models/auth.model.js';
import {Strategy as GoogleStrategy } from 'passport-google-oauth2';
import {config} from 'dotenv';
config();

passport.use(new GoogleStrategy({
    clientID:process.env.ClientID,
    clientSecret:process.env.ClientSecret,
    callbackURL:"http://localhost:4000/woben/auth/google/callback"
},async(accessToken, refreshToken,profile,done)=>{
    try {
    let user = await User.findOne({googleId:profile.id});
    if(!user){
        user = await User.create({
            googleId:profile.id,
            username:profile.displayName,
            email:profile.emails[0].value
        })
    }
    return done(null,user);
    } catch (error) {
        return done(error,null);
    }
}))


passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    try {
        const user = await User.findById(id).select("-password");
        return done(null, user);
    } catch (error) {
        return done(error,null);
    }
})
