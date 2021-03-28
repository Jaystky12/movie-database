import express from 'express'
import bodyParser from "body-parser";
import passport from "passport";
import {generateJWTToken} from "./lib/generateJWTToken";
import {mongoDatabasePromise} from "./index";

const router = express.Router()

router.post('/auth/login',
  bodyParser.json(),
  passport.authenticate('local', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.json({ ok: true, user: req.user, jwt: generateJWTToken(req.sessionID, req.user || {}) })
  }
)

router.post('/auth/get-token',
  bodyParser.json(),
  async (req, res) => {
    if (req.session ) {
      res.json({ ok: true, jwt: generateJWTToken( req.sessionID || 'Not provided' , req.user || {}) })
    } else {
      res.status(401)
      res.json({ ok: false })
    }
  }
)

router.post('/auth/logout',
  (req, res, next) => {
    req.session.regenerate((error) => {
      if (error != null) return next(error)
      res.json({ ok: true })
    })
  }
)

router.post('/auth/register',
  bodyParser.json(),
  async (req, res) => {
    const { name, email, password } = req.body;
    const collection = (await mongoDatabasePromise).collection('user')
    const user = await collection.findOne({ email: email })
    if(user) {
      res.json({ok: false, message: 'email already registered'})
    } else {
      const collection = (await mongoDatabasePromise).collection('user')
      await collection.insertOne({name: name, email:email, password:password, favouriteMovies: []})
      res.json({ ok: true })
    }
})

export default router