import {GraphQLString, GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLList} from 'graphql'



export const OmdbSearchMovieSchema = new GraphQLObjectType({
  name: 'OmdbSearchMovieSchema',
  fields: () => ({
    Title: { type: GraphQLString },
    Year: { type: GraphQLString },
    imdbID: { type: GraphQLString },
    Type: { type: GraphQLString },
    Poster: { type: GraphQLString },
  })
})

const OmdbRatings = new GraphQLObjectType({
  name: 'OmdbRatings',
  fields: () => ({
    Source: { type: GraphQLString },
    Value: { type: GraphQLString }
  })
})
export const OmdbMovieByIdSchema = new GraphQLObjectType({
  name: 'OmdbMovieByIdSchema',
  fields: () => ({
    Title: { type: GraphQLString },
    Year: { type: GraphQLString },
    Rated: { type: GraphQLString },
    Released: { type: GraphQLString },
    Runtime: { type: GraphQLString },
    Genre: { type: GraphQLString },
    Director:{ type: GraphQLString },
    Writer:  { type: GraphQLString },
    Actors: { type: GraphQLString },
    Plot: { type: GraphQLString },
    Language: { type: GraphQLString },
    Country: { type: GraphQLString },
    Awards: { type: GraphQLString },
    Poster: { type: GraphQLString },
    Ratings: { type: GraphQLList(OmdbRatings) },
    Metascore: { type: GraphQLString },
    imdbRating: { type: GraphQLString },
    imdbVotes: { type: GraphQLString },
    imdbID: { type: GraphQLString },
    Type: { type: GraphQLString },
    DVD: { type: GraphQLString },
    BoxOffice: { type: GraphQLString },
    Production: { type: GraphQLString },
    Website: { type: GraphQLString },
    Response: { type: GraphQLString },
  })
})