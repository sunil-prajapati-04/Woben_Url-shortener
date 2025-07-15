import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import urlRoutes from './routes/url.route.js';
import authRoutes from './routes/auth.route.js';
import './middleware/passport.js';
import db from './lib/db.js';
import {config} from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import connectRedis from 'connect-redis';
import redisClient from './lib/redis.js';

config();

const app = express();
const Port = process.env.PORT;


app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const RedisStore = connectRedis(session);

const redisStore = new RedisStore({
    client:redisClient,
    prefix:"sess:"
})

app.use(session({
    store:redisStore,
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1day
      httpOnly: true,
    },
}))


app.use(passport.initialize());
app.use(passport.session());


app.use('/woben/auth',authRoutes);
app.use('/woben/url',urlRoutes);



app.listen(Port,()=>{
    console.log(`app is listening on Port ${Port}`);
})