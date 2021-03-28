import React, {ComponentPropsWithRef, PureComponent} from 'react';
import '../../styles/Home/Home.css';
import {withRouter} from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface HomeState {
  searchText: string
}

class Home extends PureComponent<ComponentPropsWithRef<any>, HomeState> {


  setSearchText(text:string) {
    this.setState({
      searchText: text
    })
  }


  validateForm() {
    return this.state.searchText.length > 0
  }

  async handleSubmit(event:any) {
    event.preventDefault();
    // this.props.history.push("/");
    //TODO Send the request to the backend to get the movies
  }


  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Movie Database</h1>
          <p className="text-muted">A simple page to browse movies from OMDB</p>
        </div>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={this.state.searchText || ''}
            onChange={(e) => this.setSearchText(e.target.value)}
          />
          <Button block size="lg" type="submit" disabled={!this.validateForm()}>
            Search
          </Button>
        </Form.Group>
      </div>
    )
  }
}

export default withRouter(Home);