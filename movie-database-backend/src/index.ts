import { apolloServer } from './connections'
import connectRedis from 'connect-redis'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { createServer } from 'http'
import passport from 'passport'
import express from 'express'
import IoRedis from 'ioredis'

const app = express()
app.disable('etag')
app.disable('x-powered-by')
app.set('trust proxy', 1)

const redis = new IoRedis(process.env.REDIS_ENDPOINT)
redis.on('error', (err: string) => console.error('Redis:', err))

app.use(passport.initialize())
app.use(passport.session())

const RedisStore = connectRedis(session)

app.use(cookieParser())
app.use(session({
  store: new RedisStore({ client: redis }),
  saveUninitialized: false,
  resave: false,
  secret: process.env.SECRET ?? '',
  cookie: {
    sameSite: 'none',
    secure: true,
    maxAge: 2592e9 // 1month
  }
}))

const allowedOrigins = [
  'http://localhost:3999',
  'https://movie-database.pl',
  'http://movie-database.pl',
]

const httpServer = createServer(app)
httpServer.listen(8080, () => {
  console.log(`🚀 Gram i bucze`)
})

apolloServer.installSubscriptionHandlers(httpServer)
apolloServer.applyMiddleware({
  path: '/graphql',
  cors (req, callback) {
    const requestOrigin = req.headers.origin
    if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
      callback(null, { origin: true, credentials: true })
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  app
})

