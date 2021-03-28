import { FacebookStrategy } from './strategies/FacebookStrategy'
import { PasswordStrategy } from './strategies/UserPasswordStrategy'
import Router from './routes'
import connectRedis from 'connect-redis'
import cookieParser from 'cookie-parser'
import { MongoClient } from 'mongodb'
import session from 'express-session'
import { createServer } from 'http'
import passport from 'passport'
import IoRedis from 'ioredis'
import express from 'express'
import cors from 'cors'

export const mongoDatabasePromise = new MongoClient(
  process.env.MONGO_ENDPOINT ?? '',
  {
    useUnifiedTopology: true,
    auth: {
      user: process.env.MONGO_USERNAME ?? '',
      password: process.env.MONGO_PASSWORD ?? ''
    }
  }
)
  .connect()
  .then(client => client.db('movie-database'))

export const app = express()
app.disable('etag')
app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(cors({
  origin (origin, callback) {
    callback(null, true)
  },
  credentials: true
}))

export const httpServer = createServer(app)
httpServer.listen(8080)

export const redisClient = new IoRedis(process.env.REDIS_ENDPOINT)
redisClient.on('error', (err: string) => console.error('Redis:', err))

app.use(cookieParser())

const RedisSessiomStore = connectRedis(session)
export const SessionStore = new RedisSessiomStore({ client: redisClient })
console.log(process.env.SECRET)
app.use(session({
  store: SessionStore,
  saveUninitialized: true,
  resave: true,
  secret: process.env.SECRET ?? '',
  cookie: {
    sameSite: 'none',
    httpOnly: true,
    path: '/',
    secure: true,
    maxAge: 2592e9 // 1month
  }
}))

app.use(passport.initialize())
app.use(passport.session())

// passport.use(FacebookStrategy)
passport.use(PasswordStrategy)

app.use(Router)