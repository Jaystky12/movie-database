import React, {ComponentPropsWithRef, Component} from 'react';
import '../../styles/App.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ApolloClient from "../../apolloClient/ApolloClient";
import { omdbSearchByTitle } from "../../graphql/querries/omdbQuerries";
import { getUser } from '../../graphql/querries/userQuerries'
import { updateUser } from '../../graphql/mutations/userMutations'
export interface MovieCardState {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export default class MovieCard extends Component<ComponentPropsWithRef<any>, MovieCardState> {

  constructor(props:ComponentPropsWithRef<any>) {
    super(props);
    this.state = {
      Title: props.Title,
      Year: props.Year,
      imdbID: props.imdbID,
      Type: props.Type,
      Poster: props.Poster
    }
    this.addToFavourites =this.addToFavourites.bind(this)
  }

  async addToFavourites(){
    try {
      const existingUser = await ApolloClient.query({
        query: getUser,
        variables: {
          id: localStorage.getItem('id'),
        }
      })
      const favouriteMovies: string[] = existingUser.data.users.get.favouriteMovies
      if(!favouriteMovies.includes(this.state.imdbID)){
        favouriteMovies.push(this.state.imdbID)
        await ApolloClient.mutate({
          mutation: updateUser,
          variables: {
            id: localStorage.getItem('id'),
            user: {favouriteMovies: favouriteMovies}
          }
        })
      }else{
        throw new Error('Movie already in your favourites')
      }
    } catch (e) {
      alert('Email already in use');
    }
  }

  render() {
    return (
      <div>
        <Card style={{ width: '18rem', height: '34.5rem'}} className="text-center">
          <Card.Img variant="top" src={this.state.Poster} style={{maxHeight: '24rem' }} />
          <Card.Body>
            <Card.Title>{this.state.Title}</Card.Title>
            <Card.Text>
              Year: {this.state.Year}
              &nbsp;
              Type: {this.state.Type}
            </Card.Text>
            <Button variant="info" onClick={this.addToFavourites}>Add to favourites</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}