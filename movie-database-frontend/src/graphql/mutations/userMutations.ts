import gql from 'graphql-tag'

export const updateUser = gql`
mutation($id: ID!, $user: UserInputSchema){
  users{
    update(_id:$id,user:$user){
      _id
      name
      email
      password
      favouriteMovies
    }
  }
}
`