import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { UserMutationCtrl} from "./users/userMutation"
import { UserQueryCtrl } from "./users/userQuery";
import { OmdbQueryCtrl } from "./omdb/omdbQuery";

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        users: {
          type: UserQueryCtrl,
          resolve: root => root || {}
        },
        omdb : {
          type: OmdbQueryCtrl,
          resolve: root => root || {}
        }
      })
    }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        users: {
          type: UserMutationCtrl,
          resolve: root => root || {}
        }
    }),
  }),
})
