import React, {ComponentPropsWithRef, PureComponent} from 'react';
import '../../styles/App.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export interface MovieCardState {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export default class MovieCard extends PureComponent<ComponentPropsWithRef<any>, MovieCardState> {

  constructor(props:ComponentPropsWithRef<any>) {
    super();
    this.state = {
      Title: props.Title,
      Year: props.Year,
      imdbID: props.imdbID,
      Type: props.Type,
      Poster: props.Poster
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
            <Button variant="info">Add to favourites</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}