import React, {ComponentPropsWithRef, PureComponent} from 'react';
import '../../styles/App.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
interface MovieCardState {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export default class MovieCard extends PureComponent<ComponentPropsWithRef<any>, MovieCardState> {

  constructor(props:ComponentPropsWithRef<any>) {
    super();
    console.log(props)
    this.state = {
      Title: '',
      Year: '',
      imdbID: '',
      Type: '',
      Poster: ''
    }
  }

  render() {
    return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.state.Poster} />
          <Card.Body>
            <Card.Title>{this.state.Title}</Card.Title>
            <Card.Text>
              Year: {this.state.Year}
              Type: {this.state.Type}
            </Card.Text>
            {/*<Button variant="primary">Go somewhere</Button>*/}
          </Card.Body>
        </Card>
      </div>
    )
  }
}