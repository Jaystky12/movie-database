import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { UserInputSchema, UserSchema } from "./userSchema";
import { mongoDatabasePromise } from '../../connections'
import {ObjectId} from "mongodb";

export const UserMutationCtrl = new GraphQLObjectType({
  name: 'UserMutationCtrl',
  fields: () => ({
    create: {
      type: UserSchema,
      args: {
        user: { type: UserInputSchema },
      },
      async resolve (source, { user }) {
        const collection = (await mongoDatabasePromise).collection('user')
        const res = await collection.insertOne(user)
        return res.ops[0] || undefined
      }
    },
    update: {
      type: UserSchema,
      args: {
        _id: { type: GraphQLNonNull(GraphQLID)  },
        user: { type: UserInputSchema },
      },
      async resolve (source, { _id, user }) {
        const collection = (await mongoDatabasePromise).collection('user')
        await collection.findOneAndUpdate({_id: new ObjectId(_id)}, {$set: user})
        return collection.findOne({_id: new ObjectId(_id)})
      }
    },
    delete: {
      type: GraphQLBoolean,
      args: {
        _id: { type: GraphQLNonNull(GraphQLID)  },
      },
      async resolve (source, { _id }) {
        const collection = (await mongoDatabasePromise).collection('user')
        const res = await collection.deleteOne({_id: new ObjectId(_id)})
        console.log(res)
        return res.result.n ? res.result.n > 1 : false
      }
    },
  })
})
