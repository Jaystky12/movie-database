import passport from 'passport';
import { Strategy } from 'passport-local'
import {mongoDatabasePromise} from "../index";
import { ObjectID } from 'mongodb'

export interface User {
  email: string
  _id: string
  password: string
}
passport.serializeUser<any, any>((user: User, done: any) => {
  done(undefined, user);
});

passport.deserializeUser(async (id: string, done: any) => {
  await findUser({ _id: new ObjectID(id)}, (err: any, user: User) => {
    done(err, user);
  });
});

export const PasswordStrategy = new Strategy({usernameField : 'email'},
  async function(email, password, done) {
    await findUser({email: email}, function (err:any, user: User) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {message: 'Incorrect username.'});
      }
      if (password !== user.password) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      return done(null, user);
    })
  })

export async function findUser(filters: { [k: string]: any }, callback: any){
  const collection = (await mongoDatabasePromise).collection('user')
  const user = await collection.findOne({ ...filters })

  if (typeof user !== 'object' || user == null) return callback(Error('User not found'), undefined)

  return callback(undefined, { email: user.email, _id: String(user._id), password: user.password})
}

function validPassword(password:string){
  return true
}
