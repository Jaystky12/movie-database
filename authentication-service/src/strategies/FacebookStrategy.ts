import passport from 'passport';
import { Strategy } from 'passport-facebook'
import {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET} from '../config'

export const FacebookStrategy = new Strategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {

  }
);