import { MongoClient } from 'mongodb'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import schema from './graphql/graphqlSchema'
import { validateJwtToken } from './auth/validateJwtToken'

export const mongoDatabasePromise = new MongoClient(
  '' + process.env.MONGO_ENDPOINT,
  {
    useUnifiedTopology: true,
    auth: {
      user: '' + process.env.MONGO_USERNAME,
      password: '' + process.env.MONGO_PASSWORD
    }
  }
)
  .connect()
  .then(client => client.db(process.env.MONGO_DATABASE))

export const apolloServer = new ApolloServer({
  schema: schema,
  context: async (context: any) => {
    const Authorization = context.req.get('authorization')
    if (Authorization) {
      const token = Authorization.replace('bearer ', '')
      validateJwtToken(token)
    } else {
      throw new AuthenticationError('No headers provided')
    }
    return context
  }
})

export const omdbUrl = 'http://www.omdbapi.com/?apikey=f2541e86'
