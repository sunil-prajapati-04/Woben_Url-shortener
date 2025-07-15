import express from 'express';
import {googleCallback, signup, login, myProfile, logout } from '../controllers/auth.controller.js';
import { isAuth } from '../middleware/auth.middleware.js';
import passport from 'passport';

const router = express.Router();

router.get('/google',passport.authenticate('google',{scope:["profile","email"]}));
router.get('/google/callback',passport.authenticate('google',{session:true}),googleCallback);


router.post('/signup',signup);
router.post('/login',login);
router.get('/profile',isAuth,myProfile);
router.post('/logout',isAuth,logout);

export default router;