import {GraphQLString, GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLList} from 'graphql'



export const UserSchema = new GraphQLObjectType({
  name: 'UserSchema',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    favouriteMovies: { type: GraphQLList(GraphQLString)  },
  })
})

export const UserInputSchema = new GraphQLInputObjectType({
  name: 'UserInputSchema',
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    favouriteMovies: { type: GraphQLList(GraphQLString) },
  })
})


