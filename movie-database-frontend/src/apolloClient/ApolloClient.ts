import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { authLink, errorLink } from './ErrorAuthLink'

const httpLink = new HttpLink({
  uri: `http://movie-database.pl/graphql`
  // credentials: 'include',
  // fetchOptions: {
  //   mode: 'cors'
  // }
})

export default new ApolloClient({
  connectToDevTools: false,
  // link: errorLink.concat(authLink.concat(httpLink)),
  link: httpLink,
  cache: new InMemoryCache()
})
