import React, {ComponentPropsWithRef, PureComponent} from 'react';
import '../../styles/Home/Home.css';
import {withRouter} from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Row, Col} from "react-bootstrap";
import ApolloClient from "../../apolloClient/ApolloClient";
import { omdbSearchByTitle } from '../../graphql/querries/omdbQuerries'
import MovieCard, { MovieCardState } from '../Movie/MovieCard'
import CardColumns from "react-bootstrap/CardColumns";

interface HomeState {
  searchText: string
  movies: MovieCardState[]
  page: number
}

class Home extends PureComponent<ComponentPropsWithRef<any>, HomeState> {
  constructor(props:ComponentPropsWithRef<any>) {
    super();
    this.state = {
      searchText: '',
      movies: [],
      page: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchMoviesFromOmdb = this.fetchMoviesFromOmdb.bind(this)
  }

  setSearchText(text:string) {
    this.setState({
      searchText: text
    })
  }

  validateForm() {
    return this.state.searchText.length > 0
  }
  async fetchMoviesFromOmdb(){
    try {
      const searchResult = await ApolloClient.query({
        query: omdbSearchByTitle,
        variables: {
          searchString: this.state.searchText,
          page: this.state.page
        }
      })
      if(searchResult.data.omdb && searchResult.data.omdb.search.length > 0){
        const newMoviesList = [...this.state.movies, ...searchResult.data.omdb.search]
        await this.setState({
          movies: newMoviesList
        })
      }else {
        throw new Error('No movies were found, try different title')
      }
    } catch (e) {
      alert(e.message);
    }
  }
  async handleSubmit(event:any) {
    event.preventDefault();
    await this.setState({
      movies: []
    })
    await this.fetchMoviesFromOmdb()
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
        <CardColumns style={{ maxWidth: '70rem', margin: 'auto'}}>
          {
            this.state.movies.map(movie => {
              return <MovieCard key={movie.imdbID} {...movie}/>
            })
          }
        </CardColumns>
        { this.state.movies.length > 0 ?
          <div style={{margin: "0 auto", textAlign: "center"}}>
            <Button type="submit" style={{margin: "0 auto", textAlign: "center"}} onClick={async (e) => {
              const pageCounter = this.state.page + 1
              await this.setState({
                page: pageCounter
              })
              await this.fetchMoviesFromOmdb()
            }}>
              Show More
            </Button>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default withRouter(Home);