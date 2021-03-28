import gql from 'graphql-tag'

export const omdbSearchByTitle = gql`
query ($searchString: String!, $page: Int!){
  omdb{
    search(searchString: $searchString, page: $page){
      Title
      Year
      imdbID
      Poster
      Type
    }
  }
}
`
