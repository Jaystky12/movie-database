import React, {ComponentPropsWithRef, PureComponent} from 'react';
import '../../styles/Home/Home.css';
import {withRouter} from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Row, Col} from "react-bootstrap";
import ApolloClient from "../../apolloClient/ApolloClient";
import { omdbSearchByTitle } from '../../graphql/querries/omdbQuerries'

interface HomeState {
  searchText: string
}

class Home extends PureComponent<ComponentPropsWithRef<any>, HomeState> {
  constructor(props:ComponentPropsWithRef<any>) {
    super();
    this.state = {
      searchText: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

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
    const searchResult = await ApolloClient.query({
      query: omdbSearchByTitle,
      variables: {
        searchString: this.state.searchText,
        page: 1
      }
    })
    console.log(searchResult)
    //TODO Send the request to the backend to get the movies
  }


  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Movie Database</h1>
          <p className="text-muted">A simple page to browse movies from OMDB</p>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="searchForm">
            <Col sm={8}>
              <Form.Control
                placeholder="Search movies by title"
                autoFocus
                style={{float: "left"}}
                type="text"
                value={this.state.searchText || ''}
                onChange={(e) => this.setSearchText(e.target.value)}
              />
            </Col>
            <Col sm={3}>
              <Button type="submit" disabled={!this.validateForm()} style={{float: "left"}}>
                Search
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default withRouter(Home);