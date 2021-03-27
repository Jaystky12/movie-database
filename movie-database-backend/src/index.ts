import { apolloServer } from './connections'
import express from 'express'
import { createServer } from 'http'
import IoRedis from 'ioredis'

const app = express()
app.disable('etag')
app.disable('x-powered-by')
app.set('trust proxy', 1)

const redis = new IoRedis(process.env.REDIS_ENDPOINT)
redis.on('error', (err: string) => console.error('Redis:', err))

const allowedOrigins = [
  'http://localhost:8000',
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

