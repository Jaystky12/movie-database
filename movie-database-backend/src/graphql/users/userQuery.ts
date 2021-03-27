import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql'
import { UserSchema } from './userSchema'
import { mongoDatabasePromise } from '../../connections'
import { ObjectId } from  'mongodb'


export const UserQueryCtrl = new GraphQLObjectType({
  name: 'UserQueryCtrl',
  fields: () => ({
    get: {
      type: UserSchema,
      args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve (source, { _id }) {
        const collection = (await mongoDatabasePromise).collection('user')
        console.log(collection.findOne({_id: new ObjectId(_id)}))
        return collection.findOne({_id: new ObjectId(_id)})
      }
    }
  })
})
