import gql from 'graphql-tag'

export const getUser = gql`
query($id: ID!){
  users{
    get(_id: $id){
      _id
      name
      email
      password
      favouriteMovies
    }
  }
}
`