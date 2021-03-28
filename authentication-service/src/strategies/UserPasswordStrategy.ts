import passport from 'passport';
import { Strategy } from 'passport-local'
import {mongoDatabasePromise} from "../connections";

export const PasswordStrategy = new Strategy({usernameField : 'email'},
  async function(email, password, done) {

    const user = await findUser({email: email})
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (password !== user.password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
    }
  )

async function findUser(filters: { [k: string]: any }){
  const collection = (await mongoDatabasePromise).collection('user')
  const user = await collection.findOne({ ...filters })
  if (typeof user !== 'object' || user == null) return null
  return {
    _id:  user._id,
    email: filters.email,
    password: user.password
  }
}

function validPassword(password:string){
  return true
}
