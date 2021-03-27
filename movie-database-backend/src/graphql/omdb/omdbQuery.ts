import {GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql'
import { OmdbSearchMovieSchema, OmdbMovieByIdSchema } from './omdbSchema'
import fetch, { Headers, RequestInit, Response } from 'node-fetch'
import {omdbUrl} from "../../connections";


export const OmdbQueryCtrl = new GraphQLObjectType({
  name: 'OmdbQueryCtrl',
  fields: () => ({
    get: {
      type: OmdbMovieByIdSchema,
      args: {
        imdbID: { type: GraphQLNonNull(GraphQLString)}
      },
      async resolve (source, { imdbID }) {
        const response = await fetch(omdbUrl + `&i=${imdbID}`)
        return response.ok ? await response.json() : null
      }
    },
    search: {
      type: GraphQLList(OmdbSearchMovieSchema),
      args: {
        searchString: { type: GraphQLNonNull(GraphQLString)},
        page: { type: GraphQLNonNull(GraphQLInt)}
      },
      async resolve (source, { searchString, page}) {
        const response = await fetch(omdbUrl + `&s=${searchString}&p=${page}`)
        return response.ok ? (await response.json()).Search : null
      }
    }
  })
})