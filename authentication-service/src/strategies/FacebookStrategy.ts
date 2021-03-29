import passport from 'passport';
import { Strategy } from 'passport-facebook'
import {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET} from '../config'
import {mongoDatabasePromise} from "../index";
import { User } from './UserPasswordStrategy'
export const FacebookStrategy = new Strategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://movie-databse.pl/auth/facebook/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
  console.log(profile)
    await findOrCreate(profile, function(err:any, user:User) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
);

export async function findOrCreate(profile:any, callback: any){
  const collection = (await mongoDatabasePromise).collection('user')
  const user = await collection.findOne({ ...profile })

  if (typeof user !== 'object' || user == null) return callback(Error('User not found'), undefined)

  return callback(undefined, { email: user.email, _id: String(user._id), password: user.password})
}